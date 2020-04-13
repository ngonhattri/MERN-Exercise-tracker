const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    username: { type: String, required: true},
    categoryName: { type: String, required: true},
    difficulty: { type: String, required: true},
    question: { type: String, required: true},
    correctAnswer: { type: String, required: true}
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;