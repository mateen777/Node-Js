import express from "express"; //ES6 style Importing.
import { connectToDBByMongoose } from "./db.js";
import mongoose from "mongoose";


const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

const userSchema = new mongoose.Schema({
    name:String,
    gender:String,
    createdAt:Date,
})

const User  =  mongoose.model("students",userSchema);
// const User  =  mongoose.model("users",userSchema);

connectToDBByMongoose();

//GET
app.get('/students',async (req,res)=>{
    try {
      // Connect to the MongoDB cluster
      
      const result = await User.find();
    res.json(result);
    console.log(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({error:"internal server error"});
  }
});

// POST
app.post('/students',async (req,res)=>{
  try {
    // Connect to the MongoDB cluster
    console.log(req.body);
    // connectToDBByMongoose();
    const user = new User(req.body);
    await user.save();
    res.json({status:'success',result:''});
    // console.log(result);
  } catch (e) {
      console.error(e);
      res.status(500).json({error:"internal server error"});
  }
});

// PUT
app.put('/students',async (req,res)=>{
  try {
    // Connect to the MongoDB cluster
    console.log(req.body);
    
    
    res.json({status:'success',result:''});
    // console.log(result);
  } catch (e) {
      console.error(e);
      res.status(500).json({error:"internal server error"});
  }
});
// DELETE
app.delete('/students',async (req,res)=>{
  try {
    // Connect to the MongoDB cluster
    console.log(req.body);
    
    res.json({status:'deleted successfully',result:''});
    // console.log(result);
  } catch (e) {
      console.error(e);
      res.status(500).json({error:"internal server error"});
  }
});

app.listen( port ,()=>{
    console.log(`server is running at port number ${port}`);
});