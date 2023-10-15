import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../MyContext";
import axios from "axios";
import "../../index.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { state, Logout } = useContext(AuthContext);
  const [questions, setQuestion] = useState();
  const router=useNavigate()
  // const response=axios.post("http://localhost:8000/create-quiz")
  // if(response.data.success){
  // setQuestion(response.data.details)
  // }
  // console.log(questions,"ques")
  return (
    <>
      {/* <div style={{display:"flex",justifyContent:"space-around"}}>
      <h1>home</h1>
      <h2>Durvesh</h2>
      <h2>{state?.user?.email}</h2>
      <h3 onClick={Logout}>Logout</h3>
    </div> */}
      <div className="home">
        <img
          src="https://img.freepik.com/premium-vector/collection-colored-thin-icon-learning-subject-book-graduated-hat-learning-education-concept-vector-illustration_168824-141.jpg?w=740"
          alt=""
        />
        <div className="home-sec">
<h1 className="home-sec-title">Welcome to Quiza</h1>
<p className="home-text">Practice and Set-up quizzes on our Platform</p>
<div>
  <button className="home-btns home-btn1" onClick={()=>router('/register')}>Register</button>
  <button className="home-btns home-btn2" onClick={()=>router('/login')}>Login</button>
</div>
          <div>

          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
