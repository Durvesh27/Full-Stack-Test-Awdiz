import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../MyContext'
const Login = () => {
const{Login}=useContext(AuthContext)
const [userData,setUserData]=useState({email:"",password:""})
const router=useNavigate()
const {state}=useContext(AuthContext)
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
if(response.data.userObject.role=="User"){
  router('/categories')
}else{
  router('/admin')
}
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

useEffect(()=>{
  if(state?.user?.name){
  router("/categories")
  }
  },[state])
  return (
    <div className='user'>
      <h2 className='user-Text'>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Enter your email</label>
        <input type="email" name="email" onChange={handleChange} className='form-ip'/>
        <label>Enter your password</label>
        <input type="password" name="password" onChange={handleChange} className='form-ip'/>
        <input type="submit" value='Login'  className='reg-btn'/>
        <p style={{marginTop:"10px"}}>Don't have an account? <b style={{color:"blue"}} onClick={()=>router('/register')}>Register</b></p>
      </form>
    </div>
  )
}

export default Login