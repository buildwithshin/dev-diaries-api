//[SECTION] Dependencies and Modules
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Blog = require("../models/blog");
const auth = require('../auth');

const { errorHandler } = auth;

// [SECTION] Controller for Blog Creation
exports.createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author: req.user.id
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    errorHandler(err, req, res);
  }
};



// [SECTION] For Getting All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'firstName lastName email');
    res.status(200).json(blogs);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// [SECTION] Routes for getting Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'firstName lastName email');

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// [SECTION] Routes for editing Blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized to update this blog' });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// [SECTION] Routes for deleting Blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized to delete this blog' });
    }

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
