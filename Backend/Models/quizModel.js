import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema({
  category: {
    type: "String",
    required: true,
  },
  categoryImg: {
    type: "String",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Quiz", quizSchema);
