import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import {register,pay,payment,receipt} from "./controllers/user.controller.js"
import path from "path"
import dotenv from "dotenv"
dotenv.config()
const PORT=8080
const app=express()
await mongoose.connect(process.env.MONGO_URI)
app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.static(path.join(import.meta.dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post("/register",register)
app.get("/pay/:id",pay)
app.post("/2026GO4255",payment)
app.get("/receipt",receipt)
app.listen(PORT,'0.0.0.0',e=>{
  console.log(`Server runing at ${PORT}`);
})