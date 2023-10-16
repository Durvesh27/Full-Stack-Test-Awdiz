import quizModel from "../Models/quizModel.js";
import jwt from 'jsonwebtoken'

export const CreateQuiz=async(req,res)=>{
try{
const{category,question,opt1,opt2,opt3,opt4,answer}=req.body.questionData
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
category,
userId:userId
}
const element=new quizModel(details)
await element.save()
return res.status(200).json({success:true,message:"quiz created"}) 
}
catch(error){
return res.status(500).json({success:false,message:error}) 
}
}