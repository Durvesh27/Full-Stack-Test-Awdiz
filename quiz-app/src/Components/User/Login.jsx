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
console.log(userData,"data")
const handleSubmit=async(e)=>{
e.preventDefault()
if(userData.email && userData.password){
try{
const response=await axios.post("http://localhost:8000/login",{userData})
if(response.data.success){
alert(response.data.message)
localStorage.setItem("QuizToken",JSON.stringify(response.data.userObject.token))
Login(response.data.userObject)
router('/')
}else{
alert(response.data.message)
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
    <div className='user'>
      <h2 style={{textAlign:"center"}}>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Enter your email</label>
        <input type="email" name="email" onChange={handleChange} className='form-ip'/>
        <label>Enter your password</label>
        <input type="password" name="password" onChange={handleChange} className='form-ip'/>
        <input type="submit" value='Login'  className='reg-btn'/>
        <p>Don't have an account? <b style={{color:"blue"}} onClick={()=>router('/register')}>Register</b></p>
      </form>
    </div>
  )
}

export default Login