// USE THIS FILE TO CONNECT TO YOUR DATABASE AND SAVE DATA ( MONGODB )

require("dotenv").config();
const { MongoClient } = require("mongodb");

// Configs
const dbURI = process.env.DB_URI || "";
const dbName = process.env.DB_NAME || "";
const DEBUG = Boolean(process.env.DEBUG === "true" || false ) || false;

// Connection
async function connect() {
  try {
    // create a new MongoDB client
    const dbClient = new MongoClient(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      connectTimeoutMS: 0,
      socketTimeoutMS: 0,
    });
    // connect to MongoDB server
    await dbClient.connect();
    // Return DB client connected
    return dbClient;
  } catch (error) {
    if( DEBUG ) console.warn(new Date(), "DB connection error. Check if network IP is allowed to connect.", error);
    return false;
  }
}
// Add
async function add(collectionName, data) {
  // Return
  if (!collectionName || !data) return false;

  try {
    // create a new MongoDB client
    const dbClient = await connect();
    // select the database
    const db = dbClient.db(dbName);
    // select the collection
    const collection = db.collection(collectionName);

    try {
      // Insert data
      await collection.insertMany(JSON.parse(JSON.stringify(data)), {
        ordered: true,
      });
    } catch (error) {
      if( DEBUG ) console.warn(new Date(), "DB save data error", error);
    }
    // Closed DB
    await dbClient.close();
  } catch (error) {
    if( DEBUG ) console.warn(new Date(), "DB connection error", error);
  }
}
// Drop
async function drop(collectionName) {
  // Return
  if (!collectionName) return false;

  try {
    // create a new MongoDB client
    const dbClient = connect();
    // select the database
    const db = dbClient.db(dbName);
    // select the collection
    const collection = db.collection(collectionName);
    try {
      // Insert data
      await collection.drop();
    } catch (error) {
      if( DEBUG ) console.warn(new Date(), "DB drop data error", error);
    }
    // Closed DB
    await dbClient.close();
  } catch (error) {
    if( DEBUG ) console.warn(new Date(), "DB connection error", error);
  }
}
// Find
async function find(collectionName, query) {
  // Return
  if (!collectionName) return false;

  try {
    // create a new MongoDB client
    const dbClient = await connect();
    // select the database
    const db = dbClient.db(dbName);
    // select the collection
    const collection = db.collection(collectionName);
    try {
      // Select data
      const ret = await collection.find(query).toArray();

      // Remove _id from array to uniformize data
      if (ret.length > 0) {
        ret.forEach((item) => {
          delete item._id;
        });
      }

      return ret;
    } catch (error) {
      if( DEBUG ) console.warn(new Date(), "DB select data error", error);
    }
    // Closed DB
    await dbClient.close();
  } catch (error) {
    if( DEBUG ) console.warn(new Date(), "DB connection error", error);
  }
}

// Export
module.exports = {
  add,
  find,
  drop,
};
