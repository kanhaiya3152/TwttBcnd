import mongoose from "mongoose"

const hashtagSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId, //to store tweetId
            ref: 'Tweet'
        }
    ]
}, {timestamps: true}) 

const Howashtag = mongoose.model('Hashtag', hashtagSchema)
// module.exports = hashtag;
export default Hashtag;