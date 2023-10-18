import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [flag,setFlag]=useState(false)
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
  console.log(allCategories,"all")
  return <div>
  {
    allCategories.map((item)=>(
    <div key={item._id} style={{width:"100px",height:"200px",border:"1px solid black"}}>
    <h2>{item.category}</h2>
    <img src={item.categoryImg} alt="" style={{width:"80%px",height:"60%"}}/>
    <button>Start quiz</button>
    </div>
    ))
  }
  </div>;
};

export default Categories;
