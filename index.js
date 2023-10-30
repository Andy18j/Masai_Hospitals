const express = require("express")
const { connection } = require("mongoose")
const {config} = require("./config/db")
const {userRouter} = require("./routes/user.routes")
const {doctorRouter} = require("./routes/doctor.routes")
const cors = require("cors")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("",doctorRouter)


app.get("/",(req,res)=>{
    res.send("HOME PAGE 🏠")
})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to the db✅");
         
    }
    catch(err){
        console.log("Not connected to the db")
    }
    console.log(`port is running at the ${process.env.port}`)
})