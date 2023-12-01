import React, { useState, useEffect } from "react";
const Timer = ({ duration, onTimeUp }) => {
  const storedTimer = localStorage.getItem("quizTimer");
  const initialTimer = storedTimer ? parseInt(storedTimer) : duration;
  const [seconds, setSeconds] = useState(initialTimer);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timerInterval);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [seconds, onTimeUp]);

  useEffect(() => {
    localStorage.setItem("quizTimer", seconds.toString());
  }, [seconds]);
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      <p>Time left: {formatTime()}</p>
    </div>
  );
};

export default Timer;
