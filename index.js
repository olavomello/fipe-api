require("dotenv").config();
const express = require('express');

// Create server and call routes
const app = express();
const routes = require('./components/routes');
app.use('/', routes);

// Start server
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export app
module.exports = app;