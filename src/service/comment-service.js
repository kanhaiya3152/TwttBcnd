import { model } from 'mongoose';
import {CommentRepository, TweetRepository} from '../repository/index.js';

class CommentService {
    constructor(){
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create(modelId, modelType, userId, content){ // api/v1/likes/toggle?id=modelid&type=Tweet or comment
        if(modelType == 'Tweet'){
            var commentable = await this.tweetRepository.get(modelId); 
            // var likeable = await this.tweetRepository.get(modelId).populate({path: 'likes'}); on Promise(like async func) we don't apply populate func 
        }else if(modelType == 'Comment'){
            var commentable = await this.commentRepository.get(modelId);
        }else {
            throw new Error('unknown error');  
        }        
        
        const comment = await this.commentRepository.create({
            content: content,
            onModel: modelType,
            commentable: modelId,
            userId: userId,
            comments: [] 
        })
        commentable.comments.push(comment);
        await commentable.save();
        return comment;
    }
}

export default CommentService;