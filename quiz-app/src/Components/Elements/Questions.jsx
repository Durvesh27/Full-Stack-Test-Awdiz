import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { AuthContext } from "../../MyContext";
import Timer from "./Timer";
const Questions = () => {
  const {state}=useContext(AuthContext)
  const [questionData, setQuestionData] = useState([]);
  const [check, setCheck] = useState("");
  const [questionNo,setQuestionNo]=useState(1)
  const { quizCategory } = useParams();
  const [loading,setLoading]=useState(false)
  const router=useNavigate()
  const quizDuration=50;
  var storedNum = Number(localStorage.getItem("Page"));
  const [page, setPage] = useState(
    Number.isInteger(storedNum) && storedNum !== 0 ? storedNum : 1
  );

  async function getData(quizCategory) {
    const { data } = await axios.post("http://localhost:8000/get-data", {
      category: quizCategory,
      page: page,
    });
    if (data.success) {
      setQuestionData(data.result);
      setLoading(true)
    } 
  }

  useEffect(() => {
    localStorage.setItem("Page", String(page));
    getData(quizCategory);
  }, [page]);



if(loading && questionData.length===0){
  localStorage.setItem("Page", String(1));
  router(`/result/${quizCategory}`)
  localStorage.setItem('quizTimer', JSON.stringify(50));
}
  const handleSubmit = async (quesId) => {
    try{
    const token=JSON.parse(localStorage.getItem("QuizToken")) 
      const { data } = await axios.post("http://localhost:8000/submit-answer", {
        questionId: quesId,
        submittedAnswer:check,
        loggedUserId:state.user.id,
        token:token
      });
      if (data.success) {
      setPage(page+1)
      setQuestionNo(questionNo+1)
      setCheck("")
      alert("ans submitted")
      }
    }
    catch(error){
    alert(error.message)
    }
  
  };

const handleTimeUp=()=>{
localStorage.setItem('quizTimer', JSON.stringify(50));
alert("Time up!!!")
router(`/result/${quizCategory}`)
}


  return (
    <div>
      {questionData?.map((item) => (
        <div className="questions-main" key={item._id}>
          <div>
            <div className="head-flex">
            <h2 style={{fontWeight:600,fontSize:"17px"}}><span>{questionNo}. </span> {item?.question}</h2>
          <h2 style={{fontWeight:600,fontSize:"16px"}}>
          <Timer duration={quizDuration} onTimeUp={handleTimeUp} />
          </h2>
            </div>
          <RadioGroup onChange={setCheck}>
            <Stack direction="column" spacing={10}>
              <Radio value={item?.opt1} name="opt1">
                {item.opt1}
              </Radio>
              <Radio value={item?.opt2} name="opt2">
                {item.opt2}
              </Radio>
              <Radio value={item?.opt3} name="opt3">
                {item.opt3}
              </Radio>
              <Radio value={item?.opt4} name="opt4">
                {item.opt4}
              </Radio>
            </Stack>
          </RadioGroup>
          <Button mt={5} colorScheme='facebook' variant='solid' onClick={() => handleSubmit(item._id)}>
            Submit
          </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
