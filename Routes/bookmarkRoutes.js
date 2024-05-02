const express = require('express');
const router = express.Router();
const { getUserBookmarks, toggleBookmark } = require('../Controllers/bookmarkController');
const verifyToken = require("../Middlewares/authMiddleware");

router.get('/:userId', getUserBookmarks);
router.put('/toggle', verifyToken, toggleBookmark);

module.exports = router;
