import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Login, Register, getCurrentUser } from './Controllers/UserControllers.js'
import {  GetCategories,categoryQuestions,checkAnswer,createQuestion, getAnswerByUser, getData} from './Controllers/QuizControllers.js'
import { CheckAdmin, CheckUser } from './Middlewares/AllMiddlewares.js'
const app=express()

app.use(express.json())
app.use(cors())
dotenv.config()

app.get('/',(req,res)=>{
    res.send("App working")
})

app.post("/register",Register)
app.post("/login",Login)
app.post("/current-user",getCurrentUser)
app.post("/create-quiz",CheckAdmin,createQuestion)
app.get("/get-categories",GetCategories)
app.post("/get-data",getData)
app.post("/submit-answer",CheckUser,checkAnswer)
app.post("/get-answers",CheckUser,getAnswerByUser)
app.post("/category-questions",categoryQuestions)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
console.log("Connected to DB")
})

app.listen(8000,()=>{
console.log("Server running on port 8000")
})