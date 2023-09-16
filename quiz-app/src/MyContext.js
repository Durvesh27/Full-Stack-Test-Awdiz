import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const AuthContext=createContext()

const initialvalue={user:null}

function reducer(state,action){
if(action.type="login"){
return {...state,user:action.payload}
}else if(action.type="logout"){
return {...state,user:null}
}
else{
return state
}
}

const AuthProvider=({children})=>{
const[state,dispatch]=useReducer(reducer,initialvalue)

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
      }
    };
    getCurrentUserData();
  }, []);

return(
<AuthContext.Provider value={{Login,Logout,state}}>
    {children}
</AuthContext.Provider>
)

}

export default AuthProvider

