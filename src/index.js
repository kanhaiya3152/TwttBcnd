import dotenv from 'dotenv';
import express from "express";
import connect from './config/database.js'
import bodyParser from 'body-parser';
import {UserRepository,TweetRepository} from './repository/index.js'
import apiroutes from './routes/index.js'

import LikeService from './service/like-service.js'
const app = express();
app.use(bodyParser.json()); // when we testing in the postman it converts to json
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', apiroutes); 

dotenv.config();


app.listen(3000, async()=>{
    console.log("server starrt");
    await connect();
    console.log("mongodb_connected");

    const userRepo = new UserRepository();
    const tweetRepo = new TweetRepository();
    
    
    const users = await userRepo.getAll();
    const tweets = await tweetRepo.getAll(0,10);
    const likeService = new LikeService();
    await likeService.toggleLike(tweets[0].id,'Tweet',users[0].id);
})
