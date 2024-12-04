const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blackList");

module.exports.isLoggedIn = async (req,res,next)=>{
    try {
        const token =req.cookies.token || req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(400).json({message:"Token not found"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(400).json({message:"unauthorized user"});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}