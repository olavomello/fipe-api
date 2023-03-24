require("dotenv").config();
const { MongoClient } = require("mongodb");

// Configs
const dbURI = process.env.DB_URI || "";
const dbName = process.env.DB_NAME || "";

async function add(collectionName, data) {
  // Return
  if (!collectionName || !data) return false;

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
      console.warn(new Date(), "DB save data error", error);
    }
    // Closed DB
    await dbClient.close();
  } catch (error) {
    console.warn(new Date(), "DB connection error", error);
  }
}

// Drop
async function drop(collectionName) {
  // Return
  if (!collectionName) return false;

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
    // select the database
    const db = dbClient.db(dbName);
    // select the collection
    const collection = db.collection(collectionName);
    try {
      // Insert data
      await collection.drop();
    } catch (error) {
      console.warn(new Date(), "DB drop data error", error);
    }
    // Closed DB
    await dbClient.close();
  } catch (error) {
    // console.warn(new Date(), "DB connection error", error);
  }
}

// Export
module.exports = {
  add,
  drop,
};
