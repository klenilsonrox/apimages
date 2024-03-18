import User from "../models/User.js";
import {config} from "dotenv"

config()






export const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find()
        return res.status(200).json(users)
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const createUser = async (req,res)=>{
    const {name,urlImage}=req.body
    const file = req.file
    try{
        console.log(file)
        const user = await User.create({name,urlImage:req.file.firebaseUrl})
        console.log(user)
        return res.status(201).json({user, message:"Usuário criado com sucesso!"})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteUser = async (req,res)=>{
    const {id}=req.params
    try{
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message:"usuario nao encontrado"})
        }
        await User.findByIdAndDelete(id)
        return res.status(200).json({message:"Usuário deletado com sucesso!"})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
}

