import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
const [userData,setUserData]=useState({name:"",email:"",password:"",role:"User"})
const router=useNavigate()
const handleChange=(e)=>{
setUserData({...userData,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{
e.preventDefault()
if(userData.name && userData.email,userData.password && userData.role){
console.log(userData,"userdata")
try{
const response=await axios.post("http://localhost:8000/register",{userData})
if(response.data.success){
alert(response.data.message)
router('/login')
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
    <div>
      <h2 style={{textAlign:"center"}}>Register</h2>
      <form style={{display:"flex" ,flexDirection:"column",width:"100%",alignItems:"center"}} onSubmit={handleSubmit}>
        <label>Enter your name:</label>
        <input type="text" name="name" onChange={handleChange}/>
        <label>Enter your email:</label>
        <input type="email" name="email" onChange={handleChange}/>
        <label>Select role:</label>
        <select name="role" onChange={handleChange}>
            <option>User</option>
            <option>Admin</option>
            </select>
        <label>Enter your password:</label>
        <input type="password" name="password" onChange={handleChange}/>
        <input type="submit" value='Register'/>
      </form>
    </div>
  )
}

export default Register
