// lib/mongodb.js
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Bhai, MONGODB_URI missing hai .env.local mein!');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Development mein Next.js baar-baar refresh hota hai, isliye hum connection save karke rakhte hain
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production (Live website) ke liye
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;