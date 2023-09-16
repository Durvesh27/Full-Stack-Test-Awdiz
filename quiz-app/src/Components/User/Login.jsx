import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../MyContext'
const Login = () => {
const{Login}=useContext(AuthContext)
const [userData,setUserData]=useState({email:"",password:""})
const router=useNavigate()
const handleChange=(e)=>{
setUserData({...userData,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{
e.preventDefault()
if(userData.email,userData.password){
try{
const response=await axios.post("http://localhost:8000/login",{userData})
if(response.data.success){
alert(response.data.message)
localStorage.setItem("QuizToken",JSON.stringify(response.data.userDetails.userObject.token))
Login(response.data.userDetails.userObject)
router('/')
}else{
alert("Internal Server error")
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
    <div>
      <h2 style={{textAlign:"center"}}>Login</h2>
      <form style={{display:"flex" ,flexDirection:"column",width:"100%",alignItems:"center"}} onSubmit={handleSubmit}>
        <label>Enter your email:</label>
        <input type="email" name="email" onChange={handleChange}/>
        <label>Enter your password:</label>
        <input type="password" name="password" onChange={handleChange}/>
        <input type="submit" value='Login'/>
      </form>
    </div>
  )
}

export default Login