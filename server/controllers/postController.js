const Post = require("../Models/postModel");
const User = require("../models/UserModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.createPost = async (req, res) => {
  try {
    const { title, summary, content, tags, author } = req.body;
    const post = new Post({
      title,
      summary,
      content,
      tags,
      author,
      filePath: req.file ? req.file.path : null,
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error occurred" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { id, title, tags, userId } = req.query;
    let filter = {};

    if (id) {
      filter._id = id;
    }

    if (title) {
      filter.title = new RegExp(title, "i");
    }

    if (tags) {
      filter.tags = { $in: tags.split(",") };
    }

    if (userId) {
      filter.userId = userId;
    }

    const posts = await Post.find(filter);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error occurred" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post updated successfully!", updatedPost });
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};

exports.toggleSavePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { id } = req.params;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.savedPosts.indexOf(id);

    if (index === -1) {
      user.savedPosts.push(id);
    } else {
      user.savedPosts.splice(index, 1);
    }

    await user.save();

    res.status(200).json({
      message:
        index === -1 ? "Post saved successfully!" : "Post removed from saved",
      savedPosts: user.savedPosts,
    });
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};
