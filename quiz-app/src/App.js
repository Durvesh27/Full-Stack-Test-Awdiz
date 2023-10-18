import { Route, Routes } from "react-router-dom";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Home from "./Components/Common/Home";
import Admin from "./Components/Admin/Admin";
import Categories from "./Components/Elements/Categories";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}/> 
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/admin" element={<Admin/>}/>
        <Route exact path="/categories" element={<Categories/>}/>
      </Routes>
    </>
  );
}

export default App;
