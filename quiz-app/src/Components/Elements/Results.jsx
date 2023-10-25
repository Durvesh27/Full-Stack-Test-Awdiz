import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const Results = () => {
  // const [question, setQuestion] = useState([]);
  // const [answer, setAnswer] = useState([]);
  const [score, setScore] = useState(0);

  const checkAnswer = async () => {
    // const token = JSON.parse(localStorage.getItem("QuizToken"));
    // if (token) {
    //   const ans = await axios.post("http://localhost:8000/get-answers", {
    //     token,
    //   });
    //   if (ans.data.success) {
    //     setAnswer(ans.data.answer);
    //   }
    // }
    // const ques = await axios.post("http://localhost:8000/category-questions", {
    //   category: "Science",
    // });
    // if (ques.data.success) {
    //   setQuestion(ques.data.questions);
    // }
  };

  const getResult=async()=>{
    const response = await axios.post("http://localhost:8000/get-result", {
      category:"Science"
    });
    if (response.data.success) {
      console.log("work")
      setScore(response.data.marks);
    }
  }

  // const getResult = () => {
  //   let count=0;
  //   question.forEach((que) => {
  //     answer.forEach((ans) => {
  //       if (que._id === ans.questionId && que.answer === ans.submittedAnswer) {
  //         count+=1;
  //       }
  //     });
  //   });
  //   setScore(count)
  // };


  useEffect(() => {
    // checkAnswer();
    getResult()
  }, []);

//   useEffect(()=>{
//  getResult()
//   },[])

  console.log(score)
  // console.log(answer)
  // console.log(question)
  return (
    <div>
      <h2>Congrats you are passed!</h2>
      <p>Score : {score}/2</p>
    </div>
  );
};

export default Results;
