import quizModel from "../Models/quizModel.js";
import jwt from "jsonwebtoken";

export const CreateQuiz = async (req, res) => {
  try {
    const { category, categoryImg, question, opt1, opt2, opt3, opt4, answer } =
      req.body.questionData;
    const { token } = req.body;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
      return res
        .status(404)
        .json({ success: false, message: "Token not valid" });
    }
    const userId = decodedData.userId;
    const result = await quizModel.findOneAndUpdate({ category: category },{$push:{data:{question,opt1,opt2,opt3,opt4,answer}}});
   if(result){
    await result.save();
    return res.status(200).json({ success: true, message: "Question added"});
   }
    var details = {
      category,
      categoryImg,
      userId: userId,
    };
    if (!result) {      
      const element = new quizModel(details);
      element.data.push({question, opt1, opt2, opt3, opt4 ,answer})
      await element.save();
      return res.status(200).json({ success: true, message: "quiz created" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const GetCategories = async (req, res) => {
  try {
    const allCategory = await quizModel.find({});
    return res.json({ success: true, category: allCategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
