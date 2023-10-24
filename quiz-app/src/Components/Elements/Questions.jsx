import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
const Questions = () => {
  const [questionData, setQuestionData] = useState([]);
  const [check, setCheck] = useState("");
  const { quizCategory } = useParams();
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
  }, [page]);

  // const handleInc = () => {
  //   setPage(page + 1);
  // };
  // const handleDec = () => {
  //   setPage(page - 1);
  // };

  const handleSubmit = async (quesId) => {
    console.log(check,"chk")
    try{
      const { data } = await axios.post("http://localhost:8000/check-answer", {
        questionId: quesId,
        answered:check,
      });
      if (data.success) {
        alert(data.message);
        console.log(data.results,data.answered,data.id)
      }
    }
    
    catch(error){
      console(error.message)
    }
  
  };

  return (
    <div>
      {questionData?.map((item) => (
        <div className="questions-main" key={item._id}>
          <h3>{item?.question}</h3>
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
