import quizModel from "../Models/quizModel.js";
import jwt from 'jsonwebtoken'

export const CreateQuiz=async(req,res)=>{
try{
const{question,opt1,opt2,opt3,opt4,answer}=req.body;
const{token}=req.body;
const decodedData=jwt.verify(token,process.env.JWT_SECRET)
if(!decodedData){
return res.status(404).json({success:false,message:"Token not valid"})  
}
const userId=decodedData.userId
const details={
question,
opt1,
opt2,
opt3,
opt4,
answer,
userId:userId
}
const element=new quizModel(details)
await element.save()
return res.status(200).json({success:true,message:"question created"}) 
}
catch(error){
return res.status(500).json({success:false,message:error.message}) 
}
}