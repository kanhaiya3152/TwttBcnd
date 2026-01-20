import LikeService from "../service/like-service.js";

const likeService = new LikeService();

export const toggleLike = async(req,res) => {
    try {
        const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.body.userId);
        return res.status(201).json({
            success: true,
            message: "successfully toggled like",
            data: response,
            err: {}
        })
    } catch (error) {
        console.error('Error creating tweet:', error.message);
        res.status(500).json({
            success: false,
            message:"something you missed",
            data: {},
            err: error.message,
        })
    }
}