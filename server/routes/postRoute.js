const express = require('express');
const router=express.Router();
const { createPost,getAllPosts,updatePost,deletePost,toggleSavePost }= require("../controllers/postController");
const authMiddleware= require("../middlewares/authMiddleware");

router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/save", toggleSavePost);

module.exports= router;