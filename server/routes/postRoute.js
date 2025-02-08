const express = require('express');
const router=express.Router();
const PostController= require("../controllers/postController");
const authMiddleware= require("../middlewares/authMiddleware");

router.post("/", authMiddleware, PostController.createPost);

router.get("/", PostController.getAllPosts);

router.push("/:id", authMiddleware, PostController.updatePost);

router.delete("/:id", authMiddleware, PostController.deletePost);

router.post("/:id/save", authMiddleware, PostController.toggleSavePost);

module.exports= router;