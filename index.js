require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser')

// Create server and call routes
const app = express();
const routes = require('./components/routes');
app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start server
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export app
module.exports = app;