import mongoose, { Schema } from "mongoose";

const quizSchema=new Schema({
category:{
type:"String",
required:true
},
question:{
type:"String",
required:true
},
answer:{
type:"String",
required:true
},
opt1:{
type:"String",
required:true
},
opt2:{
type:"String",
required:true
},
opt3:{
type:"String",
required:true
},
opt4:{
type:"String",
required:true
},
userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
})

export default mongoose.model("Quiz",quizSchema)