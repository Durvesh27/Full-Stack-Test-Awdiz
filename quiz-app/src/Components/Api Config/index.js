import axios from "axios";
const token = JSON.parse(localStorage.getItem("QuizToken"));
if (token) {
  var api = axios.create({
    baseURL: "https://quiz-app-backend-wnf2.onrender.com",
    headers:{"Authorization":`Bearer${token}`}
  });
} else {
  var api = axios.create({
    baseURL: "https://quiz-app-backend-wnf2.onrender.com",
  });
}
export default api;
