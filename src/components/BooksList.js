import Book from "./Book";

////////////////////////////////////////////////////////
export default function BooksList({
  books,
  onSellBook,
  onDeleteBook,
  onSelectBook,
}) {
  return (
    <div className="books-list">
      {books.map((book) => (
        <Book
          book={book}
          key={book.id}
          onSellBook={onSellBook}
          onDeleteBook={onDeleteBook}
          onSelectBook={onSelectBook}
        />
      ))}
    </div>
  );
}
