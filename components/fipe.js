/* 
  vehicle_type (int): The vehicle type code (1 for cars, 2 for motorcycles, and 3 for trucks/tractors).
*/

const URL_BASE          =     'https://veiculos.fipe.org.br/api/veiculos/';
const dataTable         =     295; // Marco/2023
const dataTableUpdate   =     new Date("2023-03-01");
const DEBUG             =     true;

// Get vehicle types
function getTypes(vehicleType) {
  let ret;
  if( vehicleType ){
    ret = ( vehicleType == 1 ? "carros" : ( vehicleType == 2 ? "motos" : "caminhões" ) );
  } else {
    ret = {
      success : true,
      data : [
        { Value : 1, Label : "carros" },
        { Value : 2, Label : "motos" },
        { Value : 3, Label : "caminhões" }
      ]
    };
  }
  return ret;  
}

// Get vehicle types
async function getBrands(vehicleType) { 
  // Payload
  payload = {
      'codigoTabelaReferencia'  :   dataTable,
      'codigoTipoVeiculo'       :   vehicleType
  }

  // Post request using fetch with error handling
  await fetch(URL_BASE + 'ConsultarMarcas', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      const ret = { success : true, updatedAt : dataTableUpdate, type : vehicleType, type_label : getTypes(vehicleType), data };
      if( DEBUG ) console.log(ret);
      return ret;
  })
  .catch((error) => {
      const ret = { success : false, type : vehicleType, error };
      if( DEBUG ) console.log(ret);
      return ret;
  });
}

// Get models
async function getModels(vehicleType, brandCode) { 
  // Payload
  payload = {
      'codigoTabelaReferencia'  :   dataTable,
      'codigoTipoVeiculo'       :   vehicleType,
      'codigoMarca'             :   brandCode,      
  }

  // Post request using fetch with error handling
  await fetch(URL_BASE + 'ConsultarModelos', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      const ret = { success : true, updatedAt : dataTableUpdate, type : vehicleType, type_label : getTypes(vehicleType), brand : brandCode, data : data?.Modelos || [] };
      if( DEBUG ) console.log(ret);
      return ret;
  })
  .catch((error) => {
      const ret = { success : false, error };
      if( DEBUG ) console.log(ret);
      return ret;
  });
}

// Types
// getTypes(); // All types

// Brands
// getBrands(1); // Cars
// getBrands(2); // Motorcycles
// getBrands(3); // Trucks

// Models
// getModels(1, 7);

// Exports
module.exports = {
  getTypes,
  getBrands,
  getModels
};