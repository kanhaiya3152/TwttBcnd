const express = require('express')
const connect = require('./config/database.js')

const app = express();


app.listen(3000, async()=>{
    console.log("server starrt");
    await connect();
    console.log("mongodb_connected");
    
})
