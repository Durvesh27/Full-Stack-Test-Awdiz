import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
const Results = () => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [verify,setVerify]=useState(false)
  const { selectedCategory } = useParams()
  const router=useNavigate()
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
      category: selectedCategory,
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
<div style={{position:"relative"}}>
<div className="result">
  {
    score>=3?
      <Text fontSize='3xl' color="green" >Congrats!!! you have Passed the Quiz</Text>:
      <Text fontSize='3xl' color="red">You have Failed the Quiz</Text>
 
  }
      <Text fontSize='lg' color="black">Score : {score}/{question?.length}</Text>
    </div>
      <div className="home-btn">
      <Button colorScheme='whatsapp' variant='solid' onClick={()=>router(`/categories`)}>
      Home
      </Button>
      </div>
</div>
  );
};

export default Results;
