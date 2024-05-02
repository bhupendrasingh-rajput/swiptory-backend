const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stories: {
    type: [],
    default: []
  }
});

const Bookmark = mongoose.model('bookmark', bookmarkSchema);

module.exports = Bookmark;
