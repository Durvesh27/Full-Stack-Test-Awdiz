import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema({
  loggedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionSchema" },
  submittedAnswer: { type: String,required:true },
});

export default mongoose.model("answer", answerSchema);
