import TweetService from "../service/tweet-service.js";
import upload from "../config/file-upload-s3-config.js";

const singleUploader = upload.single('image');

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
    try {
        singleUploader(req, res, async function (err, data) {
            if (err) {
                return res.status(500).json({ error: err.message, mes: "false" });
            }
            console.log('Image url is', req.file);
            
            const payload = req.body;
            payload.image = req.file.location;
            const response = await tweetService.create(payload);
            return res.status(201).json({
                success: true,
                message: "successfully created a new tweet",
                data: response,
                err: {}
            })
        })

    } catch (error) {
        console.error('Error creating tweet:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "something you missed",
            data: {},
            err: error.message,
        })
    }
}