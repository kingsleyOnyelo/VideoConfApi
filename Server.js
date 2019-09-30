const express = require('express');
require('dotenv').config();
const route = require('./Route/UserRoute');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('./env');


console.log(env.mongodb_url);


mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("Successfully connected to DB"))
.catch(()=>console.log("Error connecting to DB"))

const app = express();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/user',route);
app.listen(env.port, ()=>{
    if(env.port){
        console.log("succesfull connection to port: " + env.port)
    }else{
        console.log("please check the port number")
    }
})