import userModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken'
export const CheckAdmin=async(req,res,next)=>{
try{
const{token}=req.body;
const decodedData=jwt.verify(token,process.env.JWT_SECRET)
if(!decodedData){
return res.status(404).json({success:false,message:"Token not valid"})  
}
const userId=decodedData.userId
const admin=await userModel.find(userId)
if(admin.role!=="Admin"){
return res.status(404).json({success:false,message:"Access granted only to Admin"}) 
}
next()
}
catch{
return res.status(500).json({success:false,message:error})  
}
}