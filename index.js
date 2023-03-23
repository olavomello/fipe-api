const DB = require('./components/db');
const FIPE = require('./components/fipe');


async function init(){

  // Read types
  const vtypes = FIPE.getTypes();
  let types = [];

  if( vtypes?.success ){
    // Types
    types = vtypes?.data || [];
    // Add types to DB
    await DB.add('types', types);

    // Loop types
    for (let i = 0; i < types.length; i++) {
      
      // Read brands from type
      const vtype = types[i].Value || 0;
      
      const vbrands = await FIPE.getBrands(vtype);
      console.log(new Date(), "vtype", vtype, "vbrands", vbrands);

      if( vbrands?.success ){
        // Add brands to DB
        await DB.add('brands', { type : vtype, ...(vbrands?.data || []) });
      } else {
        console.warn(new Date(), 'Error on read brands');
      }        
    }

  } else {
    console.warn(new Date(), 'Error on read types');
  }  
}

init();