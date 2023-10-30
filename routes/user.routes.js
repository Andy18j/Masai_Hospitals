const express = require("express")

const {UserModel} = require("../models/user.model")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    try{
        const {Email,Password,Confirm_Password}= req.body

        const user = await UserModel.findOne({Email})
        if (user){
            return res.status(401).json({msg:"this user are already present !! Try another Email address"})
        
        }
        const hash =await bcrypt.hash(Password,8)
        const newUser = new UserModel ({Email,Password:hash,Confirm_Password:hash})

        await newUser.save()

        res.status(201).json({msg:"Signup Sucessfully 🥳"})

    }
    catch(err){
        res.status(401).json({msg:"Something Went Wrong❌"})
        console.log(err)
    }
})


userRouter.post("/login",async(req,res)=>{
    try{
        const {Email,Password} = req.body
        const isuserpresent = await UserModel.findOne({Email})

        if (!isuserpresent){
            return res.status(401).json({msg:"This user are not present! Please Signup First"})
        }
        const ispasswordcorrct = await bcrypt.compare(Password,isuserpresent.Password)

        const token = jwt.sign({userId:isuserpresent._id},"secret",{
            expiresIn:"4min"
        })
        if (ispasswordcorrct){
            return res.status(201).json({msg:"Login Sucessfully🥳",token})
        }

    }
    catch(err){
        console.log(err)
        res.status(401).json({msg:"Wrong Credentials ❌ "})
    }
})

module.exports ={
    userRouter
}