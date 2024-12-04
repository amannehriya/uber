const userModel = require("../models/userModel");
const blackListModel = require("../models/blackList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req,res)=>{
 try {
      const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    const existingEmail = await userModel.findOne({email});
    if(existingEmail){
        return res.status(400).json({message:"Email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await userModel.create({name,email,password:hashedPassword});
    res.status(201).json(user);

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie("token",token);
    res.status(201).send({message:"User registered successfully",token});
} catch (error) {
    res.status(500).json({message:error.message});
}
}
module.exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }   
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET); 
        res.cookie("token",token);
        res.status(200).json({message:"User logged in successfully",token});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports.logoutUser = async (req,res)=>{ 
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(400).json({message:"Token not found"});
        }
       await blackListModel.findOneAndDelete({token});
       res.clearCookie("token");
        await blackListModel.create({token});
        res.status(200).json({message:"User logged out successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports.profileUser = async(req,res)=>{
    try {
        const user = req.user;
      res.send(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
