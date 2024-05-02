const express = require("express");
const router = express.Router();
const { addStory, fetchAllStories, getStoryById, likeStory, editStory } = require("../Controllers/storyController");
const verifyToken = require("../Middlewares/authMiddleware");


router.get("/all", fetchAllStories);
router.get("/:storyId", getStoryById);
router.post("/add", verifyToken, addStory);
router.put("/like", verifyToken, likeStory);
router.put("/edit", verifyToken, editStory);

module.exports = router;