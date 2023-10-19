const Book = require('../models/book');

async function isBookExistsByISBN(isbn) {
    const existingBook = await Book.findOne({ isbn });
    return !!existingBook;
}

module.exports = { isBookExistsByISBN };