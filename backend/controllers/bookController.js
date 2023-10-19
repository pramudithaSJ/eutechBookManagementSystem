const Book = require("../models/book");
const { isBookExistsByISBN } = require("../services/bookService");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addBook = async (req, res) => {
    const { title, author, isbn } = req.body;

    const isExistingBook = await isBookExistsByISBN(isbn);

    if (isExistingBook) {
        return res.status(400).json({ message: null, errorMessage: 'A book with the same ISBN already exists.' });
    }

    const newBook = new Book({
        title,
        author,
        isbn,
    });

    try {
        const savedBook = await newBook.save();
        res.status(201).json({ message: 'Book added successfully', data: savedBook, errorMessage: null });
    } catch (err) {
        res.status(400).json({ message: null, errorMessage: err.message });
    }
}

const deleteBook = async (req, res) => {
    const { isbn } = req.params;
    const isExistingBook = await isBookExistsByISBN(isbn);
    if (!isExistingBook) {
        return res.status(400).json({ message: null, errorMessage: 'Book does not exist' });
    }
    try {
        await Book.deleteOne({ isbn });
        res.status(200).json({ message: 'Book deleted successfully', data: null, errorMessage: null });
    } catch (err) {
        res.status(400).json({ message: null, errorMessage: err.message });
    }
}

module.exports = {
    getAllBooks,
    addBook,
    deleteBook,
}