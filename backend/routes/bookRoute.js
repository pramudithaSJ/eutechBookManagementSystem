const router = require("express").Router();
const { getAllBooks } = require("../controllers/bookController");
const { addBook } = require("../controllers/bookController");
const { deleteBook } = require("../controllers/bookController")

router.get("/", getAllBooks);
router.post("/", addBook);
router.delete("/:isbn", deleteBook);

module.exports = router;