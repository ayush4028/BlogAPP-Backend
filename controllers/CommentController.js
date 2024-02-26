// import model 
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// buiseness logic
exports.createComment = async (req, res) => {
    try {
        // Fetch data from request body
        const { post, user, body } = req.body;

        // Create a new comment object
        const comment = new Comment({
            post, user, body
        });

        // Save the new comment into the database
        const savedComment = await comment.save();

        // Find the post using id and update it by pushing the new comment's id into the comments array
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        )
            .populate("comments") // Populate the comments array with the comments documents
            .exec();

        res.json({
            post: updatedPost,
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error while creating comment",
        });
    }
};
