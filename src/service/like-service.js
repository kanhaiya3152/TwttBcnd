import { model } from 'mongoose';
import {LikeRepository, TweetRepository} from '../repository/index.js';

class LikeService {
    constructor(){
        this.likeRepository = LikeRepository();
        this.tweetRepository = TweetRepository();
    }

    async toggleLike(modelId, modelType, userId){ // api/v1/likes/toggle?id=modelid&type=Tweet or comment
        if(modelType == 'Tweet'){
            var likeable = await this.tweetRepository.get(modelId).populate('likes');
        }else if(modelType == 'Comment'){

        }else {
            throw new Error('unknown error');  
        }

        const exist = await this.likeRepository.findUserAndLikeable({ // check the like done to comment or tweet
            user: userId,
            onModel: modelType,
            likeable: modelId
        })

        if(exist){ //then remove
            likeable.likes.pull(exist.id);
            await likeable.save();
            await exist.remove();
            var isRemoved = true;
        }
        else{ // add like
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            })
            likeable.likes.push(newLike);
            await likeable.save();
            var isRemoved = false;
        }
        return isRemoved;
    }
}