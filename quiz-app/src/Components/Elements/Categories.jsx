import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './Elements.css'
import { useContext } from "react";
import { AuthContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";
import { Button ,Text} from "@chakra-ui/react";
const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const {Logout,state}=useContext(AuthContext)
  const router=useNavigate()
  useEffect(() => {
    async function getAllCategories() {
      const { data } = await axios.get(
        "http://localhost:8000/get-categories"
      );
      if (data.success) {  
setAllCategories(data.category)
      }else{
        alert(data.message)
      }
    }
    getAllCategories()
  }, []);
  
  useEffect(()=>{
    if(!state?.user){
      router("/login")
      }
  },[state])

  useEffect(()=>{
    if(state?.user?.role=="Admin"){
      router("/admin")
      }
  },[state])



  return <div className="categories">
  {
    allCategories.map((item)=>(
    <div key={item._id} className="main-class">
    <Text fontSize='lg' fontWeight="medium" textAlign="center" mb={5} >{item?.category}</Text>
    <img src={item.categoryImg} className="cat-img" />

    <Button display="block" m="auto"  mt="5" onClick={()=>router(`/questions/${item.category}`)}>Start quiz</Button>
    </div>
    ))
  }
  <div className="logout">
    <div style={{display:"flex"}}>
    Hello!&nbsp;&nbsp;
    <Text fontWeight={550} fontSize={17} color={"grey"}>
           {state?.user?.name}
    </Text>
    </div>
   
  <Button colorScheme='whatsapp' variant='solid' onClick={Logout}>
  Logout
  </Button>
  </div>
  </div>;
};

export default Categories;
