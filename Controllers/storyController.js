const mongoose = require("mongoose")
const Story = require('../Models/storyModel');

const fetchAllStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json({ stories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in Fetching Stories!' });
    }
};

const addStory = async (req, res) => {
    try {
        const { slides, category, userId } = req.body;

        if (!slides || !category || !userId) {
            return res.status(400).json({ message: "Bad Request!", })
        }

        const newStory = new Story({ slides, category, author: userId });

        await newStory.save();

        res.status(201).json({ message: 'Story posted successfully', story: newStory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Story posting failed!' });
    }
};

const getStoryById = async (req, res) => {
    try {
        const { storyId } = req.params;
        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        res.status(200).json(story);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
};

const likeStory = async (req, res) => {
    try {
        const { userId, storyId } = req.body;

        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: 'Story not found!' });
        }

        const { likes } = story;
        const userIndex = likes.indexOf(userId);

        if (userIndex !== -1) {
            likes.splice(userIndex, 1);
        } else {
            story.likes.push(userId);
        }

        await story.save();
        res.status(200).json(story);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Error!' });
    }
};


const editStory = async (req, res) => {
    try {
        const { _id, slides, category, likes, userId } = req.body;

        if (!slides || !category || !userId || !_id || !likes) {
            return res.status(400).json({ message: "Bad Request!" });
        }

        const existingStory = await Story.findById(_id);

        if (!existingStory) {
            return res.status(404).json({ message: "Story not found!" });
        }

        if (String(existingStory.author) !== String(userId)) {
            return res.status(403).json({ message: "You are not the Author" });
        }

        slides.forEach((newSlide) => {
            const existingSlideIndex = existingStory.slides.findIndex(slide => slide.id === newSlide.id);
            if (existingSlideIndex !== -1) {
                existingStory.slides[existingSlideIndex].content = newSlide.content;
            } else {
                existingStory.slides.push(newSlide);
            }
        });


        existingStory.likes = likes;
        existingStory.category = category;

        await existingStory.save();

        res.status(200).json({ message: 'Story updated successfully', story: existingStory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update story!' });
    }
};

module.exports = { addStory, fetchAllStories, getStoryById, likeStory, editStory };
