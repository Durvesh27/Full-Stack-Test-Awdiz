import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../MyContext";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
const Home = () => {
  const { state } = useContext(AuthContext);
  const router = useNavigate();

  useEffect(() => {
    if (state?.user?.name) {
      router("/categories");
    }
  }, [state]);

  return (
    <>
      <div className="home">
        <img
          src="https://img.freepik.com/premium-vector/collection-colored-thin-icon-learning-subject-book-graduated-hat-learning-education-concept-vector-illustration_168824-141.jpg?w=740"
          alt=""
        />
        <div className="home-sec">
          <h1 className="home-sec-title">Welcome to Quiza</h1>
          <p className="home-text">
            Practice and Set-up quizzes on our Platform
          </p>
          <div>
            <Button
              className="home-btns home-btn1"
              colorScheme="teal"
              variant="solid"
              onClick={() => router("/register")}
            >
              Register
            </Button>
            <Button
              className="home-btns home-btn2"
              onClick={() => router("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
