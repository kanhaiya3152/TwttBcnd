import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    onModel : { // add onModel coz of code can be production level nd not that messy ,coz we have to store like of tweets(t-id) & comments(c-id)
        type: String,
        required: true,
        enum : ['Tweet', 'Comment']
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

const Like = mongoose.model('Like', likeSchema);

export default Like;