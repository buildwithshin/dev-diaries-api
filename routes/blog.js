//[SECTION] Dependencies and Modules
const express = require('express');
const blogController = require('../controllers/blog');

const { verify, isLoggedIn, verifyAdmin} = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

// [SECTION] Route for Blog Creation
router.post("/create", verify, isLoggedIn, blogController.createBlogPost);

// [SECTION] For Getting All Blogs
router.get('/all', verify, isLoggedIn, blogController.getAllBlogs);

// [SECTION] Routes for getting Blog by ID
router.get('/view/:id', blogController.getBlogById);

// [SECTION] Routes for editing Blog by ID
router.patch('/edit/:id', verify, blogController.updateBlog);

// [SECTION] Routes for deleting Blog by ID
router.delete('/remove/:id', verify, isLoggedIn, blogController.deleteBlog);

module.exports = router;
