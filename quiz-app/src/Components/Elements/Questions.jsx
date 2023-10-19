import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Questions = () => {
  const [data, setData] = useState({});
  const { quizId } = useParams();
  const[page,setPage]=useState(1)
  useEffect(() => {
    async function getData(que) {
      const { data } = await axios.post("http://localhost:8000/get-data", {
        catId: que
      });
      if (data.success) {
        setData(data.catData);
      }
    }
    getData(quizId);
  }, []);

  return(
  <div>
    {data?.data?.slice(page-1,page).map((item) => (
      <div key={item._id} className="questions-main">
        <h3>{item.question}</h3>
        <div style={{ display: "flex" }}>
          <input type="radio" name={item.answer}/>
          <p>{item.opt1}</p>
        </div>
        <div style={{ display: "flex" }}>
          <input type="radio" name={item.answer}/>
          <p>{item.opt2}</p>
        </div>
        <div style={{ display: "flex" }}>
          <input type="radio" name={item.answer}/>
          <p>{item.opt3}</p>
        </div>
        <div style={{ display: "flex" }}>
          <input type="radio" name={item.answer}/>
          <p>{item.opt4}</p>
        </div>
        <button onClick={()=>setPage(page+1)}>Next</button>
        {
        page>1 && <button onClick={()=>setPage(page-1)}>Prev</button>
        }
      </div>
    ))}
  </div>)
};

export default Questions;
