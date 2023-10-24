import QuestionModel from "../Models/QuestionModel.js";
import quizModel from "../Models/quizModel.js";
import jwt from "jsonwebtoken";

// export const CreateQuiz = async (req, res) => {
//   try {
//     const { category, categoryImg, question, opt1, opt2, opt3, opt4, answer } =
//       req.body.questionData;
//     const { token } = req.body;
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decodedData) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Token not valid" });
//     }
//     const userId = decodedData.userId;
//     const result = await quizModel.findOneAndUpdate({ category: category },{$push:{data:{question,opt1,opt2,opt3,opt4,answer}}});
//    if(result){
//     await result.save();
//     return res.status(200).json({ success: true, message: "Question added"});
//    }
//     var details = {
//       category,
//       categoryImg,
//       userId: userId,
//     };
//     if (!result) {      
//       const element = new quizModel(details);
//       element.data.push({question, opt1, opt2, opt3, opt4 ,answer})
//       await element.save();
//       return res.status(200).json({ success: true, message: "quiz created" });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
export const createQuestion=async(req,res)=>{
  try {
    const { category,categoryImg,question, opt1, opt2, opt3, opt4, answer } =
      req.body.questionData;
    const result = await quizModel.findOne({ category:category });
    const element = new QuestionModel({question, opt1, opt2, opt3, opt4 ,answer, category});
    if (!result) { 
      const quiz=new quizModel({
        category,categoryImg,userId:req.userId
      })
      await quiz.save()
    }
      await element.save();
      return res.status(200).json({ success: true, message: "quiz created"});
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
// export const createCategory=async(req,res)=>{
//   try{
//   const {category,categoryImg}=req.body.questionData
//   const quiz=new quizModel({
//     category,categoryImg,userId:req.userId
//   })
//   await quiz.save()
//   return res.status(200).json({ success: true, quiz});
//   }catch(error){
//     return res.status(500).json({ success: false, message: error.message });
//   }
// }

export const GetCategories = async (req, res) => {
  try {
    const allCategory = await quizModel.find({});
    return res.json({ success: true, category: allCategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const getData=async(req,res)=>{
  try {
    const {page,limit=1,category}=req.body;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    const catData = await QuestionModel.find({category:category}).skip(skip).limit(limitValue)
    // const result=catData?.data?.slice(page-1,page)
    // const result=catData?.data
    return res.json({ success: true, result:catData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  } 
}

export const checkAnswer=async(req,res)=>{
  try{
  const{questionId,answered}=req.body;
  const results=await QuestionModel.findById({_id:questionId})
  if(results.answer===answered){
    return res.status(200).json({ success: true, message: "Correct answer" , results:results.answer, answered,id:questionId}); 
  }
  else{
    return res.status(200).json({ success: true, message: "Wrong answer" , results:results.answer, answered,id:questionId}); 
  }
  }
  catch(error){
    return res.status(500).json({ success: false, message: error.message }); 
  }
}
// export const Paginate=async(req,res)=>{
//   try {
//     const {page,limit=1,catId}=req.body;
//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const limitValue = parseInt(limit);
//     const quizData= await quizModel.findById(catId);
//     const event=quizData.skip(skip).limit(limit)
//     return res.json({ success: true, event:event });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }  
// }