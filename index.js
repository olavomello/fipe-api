const DB = require("./components/db");
const FIPE = require("./components/fipe");

async function init() {
  // Read types
  const vtypes = FIPE.getTypes();
  let types = [];

  if (vtypes?.success) {
    // Types
    types = vtypes?.data || [];
    
    // Drop types
    await DB.drop('types');
    // Add types
    await DB.add('types', types);

    // Drop brands
    await DB.drop('brands');

    // Brands
    for (let i = 0; i < types.length; i++) {
      // Read brands from type
      const vtype = types[i].Value || 0;
      const vbrands = await FIPE.getBrands(vtype);
      
      if (vbrands?.success ) {
        // Brands
        await DB.add("brands", vbrands);
      } else {
        console.warn(new Date(), "Error on read brands from type", vtype);
      }
    }
  } else {
    console.warn(new Date(), "Error on read types");
  }
}

init();
