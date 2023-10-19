import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const AuthContext=createContext()

const initialvalue={user:null}

// function reducer(state,action){
// if(action.type==="login"){
// return {...state,user:action.payload}
// }else if(action.type==="logout"){
// return {...state,user:null}
// }
// else{
// return state
// }
// }

function reducer(state,action){
  switch(action.type){
  case "login":
  return {...state,user:action.payload}
  case "logout":
  return {...state,user:null}
  default:
  return state
  }
  }

const AuthProvider=({children})=>{
const[state,dispatch]=useReducer(reducer,initialvalue)
const[questions,setQuestions]=useState([])
function Login(data){
if(data){
dispatch({
type:"login",
payload:data
})
}
}

function Logout (){
localStorage.removeItem("QuizToken")
dispatch({
type:"logout"
})
}

useEffect(() => {
    const getCurrentUserData = async () => {
      const token = JSON.parse(localStorage.getItem("QuizToken"));
      if(token){
        try{
          const response = await axios.post(
            "http://localhost:8000/current-user",
            { token }
          );
          if (response.data.success) {
            dispatch({
              type: "login",
              payload: response.data.user
            });
          } 
        }
        catch(error){
          console.log(error)
        }
      }else{
        alert("no token")
      }
    };
    getCurrentUserData();
  }, []);

return(
<AuthContext.Provider value={{Login,Logout,state,questions,setQuestions}}>
    {children}
</AuthContext.Provider>
)

}

export default AuthProvider

