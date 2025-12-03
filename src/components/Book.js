import { useState } from "react";
import Button from "./Button";

export default function Book({ book, onSellBook, onDeleteBook, onSelectBook }) {
  const [pop, setPop] = useState(false);
  const handleSell = () => {
    if (Number(book.quantity) > 0) {
      onSellBook(book.id);
      setPop(true);
      setTimeout(() => setPop(false), 200); // remove pop
    }
  };
  return (
    <li
      className={`book-item ${Number(book.quantity) === 0 ? "grey-book" : ""}`}
    >
      {/* Display image as cover */}
      {book.imageURL && (
        <img src={book.imageURL} alt={book.title} className="book-cover" />
      )}
      <div className="book-info">
        <p className="book-title">{book.title?.toUpperCase()}</p>
        <p className="book-author">{book.author}</p>
        <p className="book-description">{book.description}</p>
        <p className="book-pages">Pages: {book.pages}</p>
        <p className="book-quantity">
          Quantity:{" "}
          <span className={pop ? "pop-quantity" : ""}>{book.quantity}</span>
        </p>
        <div className="buttons-container">
          <Button className="edit-btn" onClick={() => onSelectBook(book)}>
            Edit
          </Button>
          <Button className="delete-btn" onClick={() => onDeleteBook(book)}>
            Delete
          </Button>
          <Button className="sell-btn" onClick={handleSell}>
            Sell
          </Button>
        </div>
      </div>
    </li>
  );
}
