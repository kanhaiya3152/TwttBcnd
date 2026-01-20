import mongoose from "mongoose";

const tweetschema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet connot more than 250 characters']
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    image: {
        type: String,
    }
}, { timestamps: true })

const Tweet = mongoose.model('Tweet', tweetschema)
export default Tweet;