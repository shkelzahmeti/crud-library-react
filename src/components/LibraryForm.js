import { useState, useEffect } from "react";
import Button from "./Button";

////////////////////////////////////////////////////////
export default function LibraryForm({ onSubmitForm, selectedBook }) {
  const emptyBook = {
    title: "",
    author: "",
    description: "",
    pages: "",
    quantity: "",
    imageURL: "",
  };

  const [newBook, setNewBook] = useState(emptyBook);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setNewBook(selectedBook ? { ...selectedBook } : emptyBook);
    setErrors({});
  }, [selectedBook]);

  const validateBook = (book) => {
    const errors = {};

    if (!book.title) errors.title = "Please enter a title";
    if (!book.author) errors.author = "Please enter an author";
    if (!book.description) errors.description = "Please enter a description";
    const pagesNumber = Number(book.pages);
    if (!book.pages || Number.isNaN(pagesNumber) || pagesNumber <= 0) {
      errors.pages = "Please enter a valid number of pages";
    }
    const quantityNumber = Number(book.quantity);
    if (!book.quantity || Number.isNaN(quantityNumber) || quantityNumber < 0) {
      errors.quantity = "Please enter a valid quantity";
    }

    // validate image url
    let random = Math.floor(Math.random() * 100 + 1);
    const isValidUrl = (str) => /^https?:\/\/.+\..+/.test(str);
    const inputImg = book.imageURL.trim();

    if (!inputImg) {
      // empty: auto-generate image
      book.imageURL = `https://covers.openlibrary.org/b/id/${random}-M.jpg`;
    } else if (!isNaN(Number(inputImg))) {
      // number: generate based on number
      book.imageURL = `https://covers.openlibrary.org/b/id/${inputImg}-M.jpg`;
    } else if (isValidUrl(inputImg)) {
      // valid URL: allow it unchanged
      book.imageURL = inputImg;
    } else {
      // invalid URL: show error
      errors.imageURL = "Please enter a number or a valid URL";
    }
    return errors;
  };

  const handleChange = function ({ target: { name, value } }) {
    setNewBook({ ...newBook, [name]: value });
    console.log(name, value);
  };

  const handleLocalFormSubmit = function (e) {
    e.preventDefault();
    const errors = validateBook(newBook);
    setErrors(errors);
    // Only submit if errors
    if (Object.keys(errors).length === 0) {
      onSubmitForm(newBook);
      setNewBook({
        title: "",
        author: "",
        description: "",
        pages: "",
        quantity: "",
        imageURL: "",
      });
    }
  };
  return (
    <div className="library-form">
      <form className="form" onSubmit={handleLocalFormSubmit}>
        <div className="form-info">
          <label>Book title</label>
          <input
            name="title"
            type="text"
            value={newBook.title}
            onChange={handleChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-info">
          <label>Author</label>
          <input
            name="author"
            type="text"
            value={newBook.author}
            onChange={handleChange}
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>

        <div className="form-info">
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            value={newBook.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-info">
          <label>Pages</label>
          <input
            name="pages"
            type="number"
            value={newBook.pages}
            onChange={handleChange}
          />
          {errors.pages && <p className="error">{errors.pages}</p>}
        </div>

        <div className="form-info">
          <label>Quantity</label>
          <input
            name="quantity"
            type="number"
            value={newBook.quantity}
            onChange={handleChange}
          />
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>

        <div className="form-info">
          <label>Book image</label>
          <input
            name="imageURL"
            type="text"
            value={newBook.imageURL}
            onChange={handleChange}
          />
          {errors.imageURL && <p className="error">{errors.imageURL}</p>}
        </div>

        <Button type="submit">
          {" "}
          {selectedBook ? "Update Book" : "Register Book"}
        </Button>
      </form>
    </div>
  );
}
