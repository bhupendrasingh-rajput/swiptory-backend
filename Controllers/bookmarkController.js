const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const Bookmark = require('../Models/bookmarkModel');


exports.getUserBookmarks = async (req, res) => {
    try {
        const { userId } = req.params;

        const bookmark = await Bookmark.findOne({ userId });

        res.status(200).json(bookmark);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.toggleBookmark = async (req, res) => {
    try {
        const { userId, story } = req.body;

        let bookmark = await Bookmark.findOne({ userId });

        if (!bookmark) {
            bookmark = new Bookmark({ userId, stories: [story] });
        } else {
            const storyIndex = bookmark.stories.findIndex(item => String(item?._id) === String(story?._id));
            if (storyIndex === -1) {
                bookmark.stories.push(story);
            } else {
                bookmark.stories.splice(storyIndex, 1);
            }
        }

        await bookmark.save();
        res.status(201).json(bookmark);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
