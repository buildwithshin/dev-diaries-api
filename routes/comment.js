const express = require('express');
const commentController = require('../controllers/comment');
const blogController = require('../controllers/blog');

const { verify, isLoggedIn, verifyAdmin} = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

// Add a comment to a blog post
router.post('/addComment/:blogId', verify, commentController.addComment);

// Get all comments for a blog post
router.get('/blog/:blogId', verify, commentController.getCommentsByBlog);

// Admin deletes any comment
router.delete('/delete/:commentId', verify, verifyAdmin, commentController.deleteComment);

module.exports = router;