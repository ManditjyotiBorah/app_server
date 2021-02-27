const express = require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const SignUp_route = require('./route/Signup')
const Product_route = require('./route/Product')
const cors = require('cors')

dotenv.config()

mongoose.connect(
    process.env.DATABASE_ACCESS, ()=> 
    console.log("Database Connected...")
    )

app.use(express.json())
app.use(cors())
app.use('/app', SignUp_route)
app.use('/app', Product_route)
app.listen(4000, () => console.log("Server is running"))