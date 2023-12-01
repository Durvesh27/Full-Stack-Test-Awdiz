import axios from "axios";
const token = JSON.parse(localStorage.getItem("QuizToken"));
if (token) {
  var api = axios.create({
    baseURL: "http://localhost:8000",
  });
} else {
  var api = axios.create({
    baseURL: "http://localhost:8000",
  });
}
export default api;
