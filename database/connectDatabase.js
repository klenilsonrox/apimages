import mongoose from "mongoose"
import {config} from "dotenv"
config()



export const connDB = async ()=>{
    try{
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@users.rifbesr.mongodb.net/`)  
    console.log("conectado ao MONGODB")
    }catch(error){
        console.log(error)
    }
}