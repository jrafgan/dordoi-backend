const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    card: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    food_quality: Number,
    service_quality: Number,
    interior: Number,
    comment: {
        type: String,
        required: true
    },
    date:  {
        type: Date,
        default: Date.now }
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;