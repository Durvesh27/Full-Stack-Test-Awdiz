import { Route, Routes } from "react-router-dom";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Home from "./Components/Common/Home";
import Admin from "./Components/Admin/Admin";
import Categories from "./Components/Elements/Categories";
import Questions from "./Components/Elements/Questions";
import Results from "./Components/Elements/Results";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/result/:selectedCategory" element={<Results />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/questions/:quizCategory" element={<Questions />} />
      </Routes>
    </div>
  );
}

export default App;
