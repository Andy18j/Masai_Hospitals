const express = require("express")

const {doctorModel} = require("../models/doctor.model")
require("dotenv").config()

const doctorRouter = express.Router()

doctorRouter.post("/appointments",async(req,res)=>{
    try{
        const data = req.body
        const newData = new doctorModel(data)
        await newData.save()
        console.log(newData)
        res.status(201).json({msg:"Doctor Data Posted Sucessfully🥳"})

    }
    catch(err){
        res.status(401).json({msg:"something went wrong"})
        console.log(err)
    }
})

doctorRouter.get("/appointments",async(req,res)=>{
     try{
        
        const data = await doctorModel.find()
        res.status(201).json({msg:"All the doctors are here",user:data})

     }
     catch(err){
        res.status(401).json({msg:'something went wronggg'})
     }
}) 


doctorRouter.get("/filter", async (req, res) => {
	try {
		const { specialization } = req.query;
		const appointments = await doctorModel.find({ specialization });
		res.status(200).json({ isError: false, appointments });
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

doctorRouter.get("/search", async (req, res) => {
	try {
		const { name } = req.query;
		const appointments = await doctorModel.find({ name });
		res.status(200).json({ isError: false, appointments });
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

module.exports = {
    doctorRouter
}