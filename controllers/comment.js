const bcrypt = require('bcrypt');
const User = require('../models/User');
const Blog = require('../models/Blog');
const auth = require('../auth');
const Comment = require('../models/Comment');

const { errorHandler } = auth;

exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;  // Change 'text' to 'comment'
    const blogId = req.params.blogId;

    // Create a new comment instance
    const newComment = new Comment({
      blog: blogId,
      user: req.user.id,
      comment  // Store the comment content here
    });

    // Save the comment to the database
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);  // Return the saved comment
  } catch (err) {
    errorHandler(err, req, res);  // Error handler
  }
};

// Get all comments for a blog post
exports.getCommentsByBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    // Fetch all comments for the specific blog post
    const comments = await Comment.find({ blog: blogId })
      .populate('user', 'firstName lastName email')  // Populate user details
      .sort({ createdAt: -1 });  // Sort by creation date in descending order

    res.status(200).json(comments);  // Return the list of comments
  } catch (err) {
    errorHandler(err, req, res);  // Error handler
  }
};

// Admin delete comment
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Delete the comment from the database
    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted successfully' });  // Return success message
  } catch (err) {
    errorHandler(err, req, res);  // Error handler
  }
};
