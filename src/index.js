import dotenv from 'dotenv';
import express from "express";
import connect from './config/database.js'
const app = express();

dotenv.config();

import service from './service/tweet-service.js'

app.listen(3000, async()=>{
    console.log("server starrt");
    await connect();
    console.log("mongodb_connected");
    let ser = new service();
    await ser.create({content: 'Hi it is my #FIRST #tweet'})
})
