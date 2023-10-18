import React, { useContext } from "react";
import "./Admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Admin = () => {
    const [questionData,setQuestionData]=useState({category:"",categoryImg:"",question:"",opt1:"",opt2:"",opt3:"",opt4:"",answer:""})
    const router=useNavigate()
    const handleChange=(e)=>{
    setQuestionData({...questionData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
    e.preventDefault()
    if(questionData.category && questionData.categoryImg && questionData.question && questionData.answer && questionData.opt1 && questionData.opt2 && questionData.opt3 && questionData.opt4){
    try{
    const token=JSON.parse(localStorage.getItem("QuizToken"))
    if(token){
        const response=await axios.post("http://localhost:8000/create-quiz",{questionData,token})
        if(response.data.success){
        alert(response.data.message)
        }else{
        alert(response.data.message)
        }
    }else{
        return alert("No token")
    }
    }catch(error){
    console.log(error)
    }
    }
    else{
    alert("Please fill all the fields")
    }
    }
  return (
    <div className="admin">
      <nav className="admin-navbar">
        <div className="admin-nav1">
          <p>My Quizzes</p>
          <p>Create Quiz</p>
        </div>
        <p>Admin</p>
      </nav>
      <div className='admin-box'>
      <h2 style={{textAlign:"center"}}>Create Quiz</h2>
      <form className="form" onSubmit={handleSubmit}>
      <label>Enter Category</label>
        <input type="text" name="category" onChange={handleChange} className='form-ip'/>
      <label>Enter Category Image</label>
        <input type="text" name="categoryImg" onChange={handleChange} className='form-ip'/>
        <label>Enter Question</label>
        <input type="text" name="question" onChange={handleChange} className='form-ip'/>
        <label>Enter Option1</label>
        <input type="text" name="opt1" onChange={handleChange} className='form-ip'/>
        <label>Enter Option2</label>
        <input type="text" name="opt2" onChange={handleChange} className='form-ip'/>
        <label>Enter Option3</label>
        <input type="text" name="opt3" onChange={handleChange} className='form-ip'/>
        <label>Enter Option4</label>
        <input type="text" name="opt4" onChange={handleChange} className='form-ip'/>
        <label>Enter Answer</label>
        <input type="text" name="answer" onChange={handleChange} className='form-ip'/>

        <input type="submit" value='Create'  className='reg-btn'/>
      </form>
    </div>
    </div>
  );
};

export default Admin;
