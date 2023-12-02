
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import api from "./Components/Api Config";

export const AuthContext = createContext();

const initialvalue = { user: null };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialvalue);
  function Login(data) {
    if (data) {
      dispatch({
        type: "login",
        payload: data,
      });
    }
  }

  function Logout() {
    localStorage.removeItem("QuizToken");
    dispatch({
      type: "logout",
    });
  }

  useEffect(() => {
    const getCurrentUserData = async () => {
      const token = JSON.parse(localStorage.getItem("QuizToken"));
      if (token) {
        try {
          const response = await api.post("/current-user", { token });
          if (response.data.success) {
            dispatch({
              type: "login",
              payload: response.data.user,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch({
          type: "logout",
        });
      }
    };
    getCurrentUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ Login, Logout, state }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
