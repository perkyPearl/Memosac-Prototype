const express = require('express');
const router=express.Router();
const { createPost,getAllPosts,updatePost,deletePost,toggleSavePost }= require("../controllers/postController");
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post("/", getAllPosts);
router.post('/create', upload.single('file'), createPost);
router.get("/:id", upload.single('file'), updatePost);
router.delete("/:id", deletePost);
router.post("/:id/save", toggleSavePost);

module.exports= router;