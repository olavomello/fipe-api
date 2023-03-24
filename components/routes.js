// API Routes
const express = require("express");
const router = express.Router();

// Controllers
const FIPE = require("../controllers/fipe");

// Version
const VERSION = "v1";

// Fipe Routes
router.get("/" + VERSION + "/types", FIPE.types);
router.get("/" + VERSION + "/brands/:type", FIPE.brands);
router.get("/" + VERSION + "/models/:type/:brand", FIPE.models);
router.get("/" + VERSION + "/years/:type/:brand/:model", FIPE.years);
router.get("/" + VERSION + "/details/:type/:brand/:model/:year", FIPE.details);

// Other Routes
router.get("/" + VERSION, (req, res) => {
  res.json({ version: "1.0", fipe_update: "2023-03" });
});

module.exports = router;
