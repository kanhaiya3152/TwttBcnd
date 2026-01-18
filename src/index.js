import dotenv from 'dotenv';
import express from "express";
import connect from './config/database.js'
import bodyParser from 'body-parser';

import apiroutes from './routes/index.js'

const app = express();
app.use(bodyParser.json()); // when we testing in the postman it converts to json
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', apiroutes); 

dotenv.config();


app.listen(3000, async()=>{
    console.log("server starrt");
    await connect();
    console.log("mongodb_connected");

})
