const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    author: {
        required: true,
        type: String,
    },
    isbn: {
        required: true,
        type: String,
    },
});

module.exports = mongoose.model('Book', bookSchema);