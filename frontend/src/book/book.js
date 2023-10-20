import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../component/createForm";
import "../style/book.css"


export default function Book() {
    const [books, setBooks] = useState([]);
    const fetchBooks = () => {
        axios
            .get("http://localhost:8080/api/books")
            .then((response) => {
                setBooks(response.data);
                console.log("Books fetched:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    };
    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = (bookISBN) => {
        const confirmation = window.confirm("Are you sure you want to delete this book?");

        if (confirmation) {
            axios
                .delete(`http://localhost:8080/api/books/${bookISBN}`)
                .then((response) => {
                    fetchBooks();
                })
                .catch((error) => {
                    console.error("Error deleting book:", error);
                });
        }
    };

    return (
        <div>
            <h1>Book Management System</h1>
            <CreateForm />
            <table className="book-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>

                            <td>
                                <button className="delete-button" onClick={() => handleDelete(book.isbn)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-trash"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.5 1a.5.5 0 0 1 .5.5V2h4V1.5a.5.5 0 0 1 1 0V2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1V1.5a.5.5 0 0 1 .5-.5zM1 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 10.293a1 1 0 0 1 1.414 0L8 11.586l1.293-1.293a1 1 0 1 1 1.414 1.414L9.414 13l1.293 1.293a1 1 0 0 1-1.414 1.414L8 14.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L6.586 13 5.293 11.707a1 1 0 0 1 0-1.414z"
                                        />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
