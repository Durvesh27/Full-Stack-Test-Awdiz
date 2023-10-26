import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
const Results = () => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [verify,setVerify]=useState(false)
  // const { selectedCategory } = useParams()
  const checkAnswer = async () => {
    const token = JSON.parse(localStorage.getItem("QuizToken"));
    if (token) {
      const ans = await axios.post("http://localhost:8000/get-answers", {
        token,
      });
      if (ans.data.success) {
        setAnswer(ans.data.answer);
      }
    }
    const ques = await axios.post("http://localhost:8000/category-questions", {
      category: "Cricket",
    });
    if (ques.data.success){
      setQuestion(ques.data.questions);
      setVerify(!verify)
    }
  };


  const getResult = () => {
    let newScore = 0;
    question.forEach((q) => {
      const matchedAnswer = answer.find((a) => a.questionId === q._id);
      if (matchedAnswer && matchedAnswer.submittedAnswer === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
  };


  useEffect(() => {
    checkAnswer();
  }, []);

  useEffect(() => {
    getResult()
  },[verify]);

  return (
    <div className="result">
      <Text fontSize='3xl' color="green">Congrats!!! you have Passed the Quiz</Text>
      <Text fontSize='lg' color="black">Score : {score}/{question?.length}</Text>
    </div>
  );
};

export default Results;
