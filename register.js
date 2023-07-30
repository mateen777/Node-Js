import express from "express"; //ES6 style Importing.
import { connectToDBByMongoose } from "./db.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
})

userSchema.pre("save",async function(next){
  console.log(this.isModified("password"),'ismodified');
  if (this.isModified("password")) {
     this.password = await bcrypt.hash(this.password,10);
     console.log(this.password);
  }
  next();
})

const User  =  mongoose.model("users",userSchema);

connectToDBByMongoose();

//GET
app.get('/users',async (req,res)=>{
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
app.post('/register',async (req,res)=>{
  try {
    // Connect to the MongoDB cluster
    console.log(req.body);
    // connectToDBByMongoose();
    // const hashPass = await bcrypt.hash(req.body.password,10);
    // const registerUser = new User({...req.body,password:hashPass});
    const registerUser = new User(req.body);
    const user = await registerUser.save();
    res.json({status:'success',result:user});
    // console.log(result);
  } catch (e) {
      console.error(e);
      console.error(e.name);
      res.status(400).json({error:e.message});
    //   res.status(500).json({error:"internal server error"});
  }
});

app.post('/login',async (req,res)=>{
    try {
      // Connect to the MongoDB cluster
      console.log(req.body);
      const {email,password} = req.body;
      const findeduser = await User.findOne({email:email});
      const match = await bcrypt.compare(password, findeduser.password);
      console.log(findeduser,'findeduser');

      if (match ) {
        res.status(201).json({status:'success',result:'successfully logged in'});
      } else {
        res.status(400).json({status:'Failed',result:'Wrong login credentials'});
      }
      // console.log(result);
    } catch (e) {
        console.error(e);
        console.error(e.name);
        res.status(400).json({error:e.message});
      //   res.status(500).json({error:"internal server error"});
    }
  });

app.post('/updateemail',async (req,res)=>{
    try {
      // Connect to the MongoDB cluster
      console.log(req.body);
      const {email,newEmail} = req.body;
      // const findeduser = await User.findOneAndUpdate({ email }, { email: newEmail });
      const findeduser = await User.findOne({email:email});
      
      console.log(findeduser,'findeduser');
      

      if (findeduser) {
        findeduser.email = newEmail;
        const u = await findeduser.save();
        res.status(201).json({status:'success',result:'successfully Updated'});
      } else {
        res.status(400).json({status:'Failed',result:'Wrong login credentials'});
      }

    } catch (e) {
        console.error(e);
        console.error(e.name);
        res.status(400).json({error:e.message});
      //   res.status(500).json({error:"internal server error"});
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