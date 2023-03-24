const axios = require('axios');

// Configs
const URL_BASE = "https://veiculos.fipe.org.br/api/veiculos/";
const dataTable = 295; // Março/2023
const dataTableUpdate = new Date("2023-03");
const DEBUG = false;

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

    // Post request using axios with error handling
    const resp = await axios.post(URL_BASE + "ConsultarMarcas", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = resp.data;
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
    if (DEBUG) console.log(ret);
    return ret;
  }
}
// Get models
async function getModels(vehicleType, brandCode) {
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

    // Post request using axios with error handling
    const resp = await axios.post(URL_BASE + "ConsultarModelos", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = resp.data;
    const ret = {
      success: true,
      updatedAt: dataTableUpdate,
      type: vehicleType,
      type_label: getTypes(vehicleType),
      brand: brandCode,
      data: data?.Modelos || [],
    };
    if (DEBUG) console.log(ret);
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

// Exports
module.exports = {
  types,
  brands,
  models,
  /* Functions */
  getTypes,
  getBrands,
  getModels,
};
