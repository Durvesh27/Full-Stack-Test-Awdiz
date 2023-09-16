import { Route, Routes } from "react-router-dom";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Home from "./Components/Common/Home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}/> 
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
