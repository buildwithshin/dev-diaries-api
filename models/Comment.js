const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    required: [true, 'Comment is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);