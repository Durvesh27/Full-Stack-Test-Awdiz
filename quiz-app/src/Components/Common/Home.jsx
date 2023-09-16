import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../MyContext'
import axios from 'axios'

const Home = () => {
const{state,Logout}=useContext(AuthContext)
const[questions,setQuestion]=useState()

// const response=axios.post("http://localhost:8000/create-quiz")
// if(response.data.success){
// setQuestion(response.data.details)
// }
// console.log(questions,"ques")
  return (
    <>
    <div style={{display:"flex",justifyContent:"space-around"}}>
      <h1>home</h1>
      <h2>{state.user.name}</h2>
      <h3 onClick={Logout}>Logout</h3>
    </div>
    <div>

    </div>
</>
  )
}
export default Home

