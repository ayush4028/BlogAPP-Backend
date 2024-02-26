//import mongoose instance
const mongoose = require("mongoose");


//route handler
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // refernece to the Post model
    },
    user:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true 
    }
});


//export 
module.exports = mongoose.model("Comment", commentSchema);