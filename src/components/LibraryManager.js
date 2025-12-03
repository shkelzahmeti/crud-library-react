import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid
import BooksList from "./BooksList";
import LibraryForm from "./LibraryForm";

export default function LibraryManager({ data }) {
  const [books, setBooks] = useState(data);
  const [selectedBook, setSelectedBook] = useState(null);
  const [popUp, setPopUp] = useState({ message: null, action: null });
  console.log(selectedBook);

  const showPopup = (message, action, duration = 2000) => {
    setPopUp({ message, action });
    setTimeout(() => setPopUp(null), duration);
  };

  // Submitting form (Adding book)
  const handleSubmitForm = function (newBook) {
    // setBooks((books) => [...books, { ...newBook, id: uuidv4() }]);
    if (selectedBook) {
      setBooks((books) =>
        books.map((book) =>
          book.id === selectedBook.id ? { ...newBook } : book
        )
      );
      setSelectedBook(null);
      showPopup(`${newBook.title} has been edited`, "update");
    } else {
      setBooks((books) => [...books, { ...newBook, id: uuidv4() }]);
      showPopup(`${newBook.title} has been added to the list`, "add");
    }
  };

  // Deleting a book
  const handleDeleteBook = function (book) {
    let confirmed = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );
    if (!confirmed) return;
    setBooks((books) => books.filter((b) => b.id !== book.id));
    showPopup(`${book.title} has been deleted`, "delete");
  };

  // Selling a book
  const handleSellBook = function (id) {
    setBooks((books) =>
      books.map((book) => {
        if (book.id !== id) return book;
        const newQuantity = Number(book.quantity) - 1;
        if (newQuantity === 0) {
          showPopup(`${book.title} has been SOLD OUT`, "soldout");
        }
        return { ...book, quantity: newQuantity };
      })
    );
  };

  // Editing a book
  const handleSelectBook = function (book) {
    setSelectedBook(book);
  };

  return (
    <section className="library-app">
      <h1>Library Management System</h1>
      {popUp?.message && (
        <div className={`sold-out-popup ${popUp.action || ""}`}>
          {popUp.message}
        </div>
      )}

      <LibraryForm
        onSubmitForm={handleSubmitForm}
        selectedBook={selectedBook}
        onSelectBook={handleSelectBook}
      />
      <BooksList
        books={books}
        onSellBook={handleSellBook}
        onDeleteBook={handleDeleteBook}
        onSelectBook={handleSelectBook}
      />
    </section>
  );
}
