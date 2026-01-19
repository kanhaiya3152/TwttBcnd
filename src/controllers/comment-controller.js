import CommentService from "../service/comment-service.js";

const commentService = new CommentService();

export const createComment = async(req,res) => {
    try {
        const response = await commentService.create(req.query.modelId, req.query.modelType, req.body.userId, req.body.content);
        return res.status(201).json({
            success: true,
            message: "successfully created new comment",
            data: response,
            err: {}
        })
    } catch (error) {
        console.error('Error creating comment:', error.message);
        res.status(500).json({
            success: false,
            message:"something you missed",
            data: {},
            err: error.message,
        })
    }
}