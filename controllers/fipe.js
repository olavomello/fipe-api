const axios = require('axios');
const DB = require('../components/db');

// Configs
const URL_BASE = "https://veiculos.fipe.org.br/api/veiculos/";
const dataTable = 295; // Março/2023
const dataTableUpdate = new Date("2023-03");
const cacheEnabled = Boolean( process.env.CACHE_ENABLED === "true" ) || false;
const DEBUG = Boolean(process.env.DEBUG === "true" || false ) || false;

// Get types
function getTypes(vehicleType) {
  let ret;
  if (vehicleType) {
    ret =
      vehicleType == 1 ? "carros" : vehicleType == 2 ? "motos" : "caminhões";
  } else {
    ret = {
      success: true,
      data: [
        { Value: 1, Label: "carros" },
        { Value: 2, Label: "motos" },
        { Value: 3, Label: "caminhões" },
      ],
    };
  }
  return ret;
}
// Get brands
async function getBrands(vehicleType) {

  // Define table name
  const tableName = "brands";

  try {

    // Check paramenters
    if (!vehicleType) {
      const ret = { success: false, error: "Vehicle type is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }

    // Payload
    const payload = {
      codigoTabelaReferencia: dataTable,
      codigoTipoVeiculo: vehicleType,
    };
    
    // Data and dataCached
    let dataCached, data = {};

    if( cacheEnabled ){
      // Cache enabled - Try to find data in database
      if( DEBUG ) console.log("Cache enabled");
      dataCached = await DB.find(tableName, payload );
    } else {
      // Cache disabled
      if( DEBUG ) console.log("Cache disabled");
    }

    if( dataCached?.length > 0 && cacheEnabled ){
      // Return data from local database
      data = dataCached; 
    } else {
      // Return data from FIPE API
      // Post request using axios with error handling
      const resp = await axios.post(URL_BASE + "ConsultarMarcas", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = resp.data;      

      // If cache enabled, save data in database
      if( data.length > 0 ){
        // Save data in database
        // Add payload properties to array data
        data.forEach(function(element) {
          Object.assign(element, { ...payload, updatedAt: new Date() });
        });
        if( cacheEnabled ) await DB.add(tableName, data);
      }
    }
    // Return data
    const ret = {
      success: true,
      updatedAt: dataTableUpdate,
      type: vehicleType,
      type_label: getTypes(vehicleType),
      data,
    };
    return ret;    
  } catch (error) {
    const ret = { success: false, error };
    return ret;
  }
}
// Get models
async function getModels(vehicleType, brandCode) {

  // Define table name
  const tableName = "models";

  try {

    // Check paramenters
    if (!vehicleType) {
      const ret = { success: false, error: "Vehicle type is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }
    if (!brandCode) {
      const ret = { success: false, error: "Brand code is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }

    // Payload
    const payload = {
      codigoTabelaReferencia: dataTable,
      codigoTipoVeiculo: vehicleType,
      codigoMarca: brandCode,
    };

    // Data and dataCached
    let dataCached, data = {};

    if( cacheEnabled ){
      // Cache enabled - Try to find data in database
      if( DEBUG ) console.log("Cache enabled");
      dataCached = await DB.find(tableName, payload );
    } else {
      // Cache disabled
      if( DEBUG ) console.log("Cache disabled");
    }

    if( dataCached?.length > 0 && cacheEnabled ){
      // Return data from local database
      if( DEBUG ) console.log("Data returned from local database.");
      data.Modelos = dataCached; 
    } else {
      // Return data from FIPE API
      // Post request using axios with error handling
      const resp = await axios.post(URL_BASE + "ConsultarModelos", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = resp.data;      

      // If cache enabled, save data in database
      if( data?.Modelos?.length > 0 ){
        // Save data in database
        // Add payload properties to array data
        data?.Modelos.forEach(function(element) {
          Object.assign(element, { ...payload, updatedAt: new Date() });
        });
        // Cache on DB
        if( cacheEnabled ) await DB.add(tableName, data?.Modelos);
      }
    }    

    // Return data
    const ret = {
      success: true,
      updatedAt: dataTableUpdate,
      type: vehicleType,
      type_label: getTypes(vehicleType),
      brand: brandCode,
      data: data?.Modelos || [],
    };
    return ret;
  } catch (error) {
    const ret = { success: false, error };
    if (DEBUG) console.log(ret);
    return ret;
  }
}
// Get years
async function getYears(vehicleType, brandCode, modelCode) {

  // Define table name
  const tableName = "years";

  try {
    
    // Check paramenters
    if (!vehicleType) {
      const ret = { success: false, error: "Vehicle type is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }
    if (!brandCode) {
      const ret = { success: false, error: "Brand code is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }
    if (!modelCode) {
      const ret = { success: false, error: "Model code is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }

    // Payload
    const payload = {
      codigoTabelaReferencia: dataTable,
      codigoTipoVeiculo: vehicleType,
      codigoMarca: brandCode,
      codigoModelo: modelCode,
    };

    // Data and dataCached
    let dataCached, data = {};

    if( cacheEnabled ){
      // Cache enabled - Try to find data in database
      if( DEBUG ) console.log("Cache enabled");
      dataCached = await DB.find(tableName, payload );
    } else {
      // Cache disabled
      if( DEBUG ) console.log("Cache disabled");
    }

    if( dataCached?.length > 0 && cacheEnabled ){
      // Return data from local database
      if( DEBUG ) console.log("Data returned from local database.");
      data = dataCached; 
    } else {
      // Return data from FIPE API
      // Post request using axios with error handling
      const resp = await axios.post(URL_BASE + "ConsultarAnoModelo", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = resp.data;   

      // If cache enabled, save data in database
      if( data?.length > 0 ){
        // Save data in database
        // Add payload properties to array data
        data.forEach(function(element) {
          Object.assign(element, { ...payload, updatedAt: new Date() });
        });
        // Cache on DB
        if( cacheEnabled ) await DB.add(tableName, data);
      }
    }      

    // Return data
    const ret = {
      success: true,
      updatedAt: dataTableUpdate,
      type: vehicleType,
      type_label: getTypes(vehicleType),
      brand: brandCode,
      model: modelCode,
      data,
    };
    return ret;
  } catch (error) {
    const ret = { success: false, error };
    if (DEBUG) console.log(ret);
    return ret;
  }
}
// Get details
async function getDetails(vehicleType, brandCode, modelCode, yearCode, typeGas = 1, typeSearch = "tradicional") {

  // Define table name
  const tableName = "details";

  try {

    // Check paramenters
    if (!vehicleType) {
      const ret = { success: false, error: "Vehicle type is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }
    if (!brandCode) {
      const ret = { success: false, error: "Brand code is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }
    if (!modelCode) {
      const ret = { success: false, error: "Model code is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }
    if (!yearCode) {
      const ret = { success: false, error: "Year code is required!" };
      if (DEBUG) console.log(ret);
      return ret;
    }

    // Payload
    const payload = {
      codigoTabelaReferencia: dataTable,
      codigoTipoVeiculo: vehicleType,
      codigoMarca: brandCode,
      codigoModelo: modelCode,
      anoModelo: yearCode,
      codigoTipoCombustivel: typeGas || 1,
      tipoConsulta : typeSearch || "tradicional",    
    };

    // Data and dataCached
    let dataCached, data = {};

    if( cacheEnabled ){
      // Cache enabled - Try to find data in database
      if( DEBUG ) console.log("Cache enabled");
      dataCached = await DB.find(tableName, payload );
    } else {
      // Cache disabled
      if( DEBUG ) console.log("Cache disabled");
    }

    if( dataCached?.length > 0 && cacheEnabled ){
      // Return data from local database
      if( DEBUG ) console.log("Data returned from local database.");
      data = dataCached; 
    } else {
      // Return data from FIPE API
      // Post request using axios with error handling
      const resp = await axios.post(URL_BASE + "ConsultarValorComTodosParametros", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = resp.data;  

      // If cache enabled, save data in database
      if( data ){
        // Save data in database
        // Add payload properties to array data
        Object.assign(data, { ...payload, updatedAt: new Date() });
        // Cache on DB
        if( cacheEnabled ) await DB.add(tableName, [data]);
      }
    } 

    // Return data
    const ret = {
      success: true,
      updatedAt: dataTableUpdate,
      type: vehicleType,
      type_label: getTypes(vehicleType),
      brand: brandCode,
      model: modelCode,
      year: yearCode,
      data,
    };
    return ret;
  } catch (error) {
    const ret = { success: false, error };
    if (DEBUG) console.log(ret);
    return ret;
  }
}


// ----------------------------------------------------------------------------------------
// API CALLS
// ----------------------------------------------------------------------------------------

// API types
async function types(req, res) {
  // Paramenter
  const vehicleType = req.query.vehicleType || 0;
  // Return
  await res.json(getTypes(vehicleType));
}
// API brands
async function brands(req, res) {
  // Paramenter
  const vehicleType = req.params.type || 0;
  // Return
  await getBrands(vehicleType).then((ret) => res.json(ret));
}
// API models
async function models(req, res) {
  // Paramenter
  const vehicleType = req.params.type || 0;
  const brandCode = req.params.brand || 0;
  // Return
  await getModels(vehicleType, brandCode).then((ret) => res.json(ret));
}
// API years
async function years(req, res) {
  // Paramenter
  const vehicleType = req.params.type || 0;
  const brandCode = req.params.brand || 0;
  const modelCode = req.params.model || 0;
  // Return
  await getYears(vehicleType, brandCode, modelCode).then((ret) => res.json(ret));
}
// API details
async function details(req, res) {
  // Paramenter
  const vehicleType = req.params.type || 0;
  const brandCode = req.params.brand || 0;
  const modelCode = req.params.model || 0;
  const yearCode = req.params.year || 0;
  const typeGas = req.query.typeGas || 1;
  const typeSearch = req.query.typeSearch || "";
  // Return
  await getDetails(vehicleType, brandCode, modelCode, yearCode, typeGas, typeSearch).then((ret) => res.json(ret));
}

// Exports
module.exports = {
  types,
  brands,
  models,
  years,
  details,
  
  /* Functions */
  getTypes,
  getBrands,
  getModels,
  getYears,
  getDetails,
};
