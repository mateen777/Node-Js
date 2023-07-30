import  { MongoClient }  from 'mongodb';
import mongoose from "mongoose";


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'mateen';

const connectToDB = async () => {
  let resp;
  // Use connect method to connect to the server
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected successfully to mongodb server');
    const db = client.db(dbName);

    return db;

  } catch (e) {
      console.error(e);
  } finally {
        // console.log('finally')
    //   await client.close();
  }
  
}



//connect to database using mongoose
const connectToDBByMongoose = async ()=>{
    const connect = await mongoose.connect("mongodb://localhost:27017/mateen");
}

export { connectToDB , connectToDBByMongoose}