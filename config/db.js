const mongoose  = require("mongoose")
require("dotenv").config()
// const express = require(express)


const connection = mongoose.connect(process.env.MONGOURL)

module.exports = {
    connection
}