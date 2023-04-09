import express  from "express";
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"
export const app = express();

config({
    path: "./data/config.env"
})
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

//using routes
app.use("/api/v1/task",taskRouter)
app.use("/api/v1/users",userRouter)

app.get('/', async (req,res)=>{
    res.send("working")
})

//this for error handling
app.use(errorMiddleware)