import React, { useState } from "react";
import axios from "axios";
import "./createForm.css"; // Import your CSS file

export default function CreateForm() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();



        axios
            .post("http://localhost:8080/api/books", formData)
            .then((response) => {
                if (response.errorMessage == null) {
                    setFormData({
                        title: "",
                        author: "",
                        isbn: "",
                    });
                    window.location.reload();
                }
                else {
                    console.log(response.errorMessage);
                }


            })
            .catch((error) => {
                console.error("Error adding book:", error);
            });
    };

    return (
        <div className="create-form-container">
            <form className="create-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Book Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="author"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="isbn">ISBN:</label>
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
