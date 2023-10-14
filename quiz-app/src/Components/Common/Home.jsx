import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../MyContext";
import axios from "axios";

const Home = () => {
  const { state, Logout } = useContext(AuthContext);
  const [questions, setQuestion] = useState();

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
      <div>
        <img
          src="https://media.istockphoto.com/id/1490047327/photo/3d-creation-of-graphic-design-creative-project-progress-and-solution-speech-bubble-message.jpg?s=2048x2048&w=is&k=20&c=GGMQnai3lczYO2a7RujHpnypLHSZQsynChCMW2TPcbw="
          alt=""
          style={{
          width:"50%",
          height:"80vh",
          marginTop:"65px",
          marginLeft:"20px",
          border:"1px solid red"
          }}
        />
      </div>
    </>
  );
};
export default Home;
