const mongoose=require('mongoose');

const PostSchema= new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {type: mongoose.Schema.Types.ObjectId , ref: "user"},
    tags:[String],
    createdAt: {type: Date, default:Date.now}
});

const PostModel=model('Post', PostSchema);
module.exports=PostModel;