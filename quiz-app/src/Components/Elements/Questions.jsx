import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { AuthContext } from "../../MyContext";
const Questions = () => {
  const {state}=useContext(AuthContext)
  const [questionData, setQuestionData] = useState([]);
  const [check, setCheck] = useState("");
  const [questionNo,setQuestionNo]=useState(1)
  const { quizCategory } = useParams();
  const router=useNavigate()
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
    } 
  }

  useEffect(() => {
    localStorage.setItem("Page", String(page));
    getData(quizCategory);
    if(!questionData){
      alert("Quiz Completed")
      router('/results')
    }
  }, [page]);



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

  return (
    <div>
      {questionData?.map((item) => (
        <div className="questions-main" key={item._id}>
          <h3><span>{questionNo}.</span> {item?.question}</h3>
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
          <Button onClick={() => handleSubmit(item._id)}>
            Submit
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Questions;
