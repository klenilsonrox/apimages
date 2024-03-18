import express from "express";
import cors from "cors";
import {config} from "dotenv";
import { connDB } from "../database/connectDatabase.js";
import routerUsers from "./routes/user-routes.js";

config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(routerUsers)



connDB()



app.listen(process.env.PORT || 3000,()=>{
    console.log(`servidor rodando na porta ${process.env.port}`)
})