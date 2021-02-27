const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

//add middlewares here

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//add routes below

const sellerRoute = require('./routes/seller.route')
app.use('', sellerRoute)

const productRoute = require('./routes/product.route')
app.use('',productRoute)


//connection

mongoose
  .connect(process.env.DATABASE_ACCESS)
  .then(() => {
    app.listen(4000);
    console.log(
      "server running"
    );
  })
  .catch((err) => console.log(err));
