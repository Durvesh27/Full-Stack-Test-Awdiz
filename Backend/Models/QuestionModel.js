import mongoose, { Schema } from "mongoose";

const QuestionSchema=new Schema({
        question: {
          type: "String",
          required: true,
        },
        answer: {
          type: "String",
          required: true,
        },
        opt1: {
          type: "String",
          required: true,
        },
        opt2: {
          type: "String",
          required: true,
        },
        opt3: {
          type: "String",
          required: true,
        },
        opt4: {
          type: "String",
          required: true,
        },category:{
            type: "String",
            required: true,  
        }
        // categoryId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Quiz",
        //   },
})

export default mongoose.model("QuestionSchema",QuestionSchema)