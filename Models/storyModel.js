const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    content: {
        heading: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }
});

const StorySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    slides: {
        type: [SlideSchema],
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Food", "Health and Fitness", "Travel", "Movie", "Education"]
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, { timestamps: true });

const Story = mongoose.model('story', StorySchema);

module.exports = Story;
