import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import  { MongoClient }  from 'mongodb'

const app = express();
const port = process.env.PORT || 8000;

//start static load html
app.set('view engine','ejs');
// 👇️ "/home/borislav/Desktop/javascript/index.js"
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)

// 👇️ "/home/borislav/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

const staticpath = path.join(__dirname,"../public")
// app.use(express.static(staticpath))
// end static load html

//if you want to change the directory name like views to something your specific name 
// const d = path.join(__dirname,'/ali')
// console.log('d',d)
// app.set('views',d)
//End

// connect mongodb to nodejs
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'mateen';

async function main() {
  let resp;
  // Use connect method to connect to the server
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('students');
    const res = await collection.find({}).toArray();
    resp = res;
    // console.log(res);
  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
  
  // the following code examples can be pasted here...
  
  return resp;
  
}

// main().catch(console.error);

app.get('/',async (req,res)=>{
  // res.render('index',{name:'Mateen'});
    // await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('students');
    // const resp = await collection.find({}).toArray();
    let resp = await main();
    console.log(resp)
    res.send(resp)
})

app.listen( port ,()=>{
    console.log(`server is running at port number ${port}`);
});