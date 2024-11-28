import React, { useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import "./DeleteBook.css";

const DeleteBook = () => {
  const fakeBooks = [
    { id: 1, name: "Livro A", description: "Descrição do Livro A" },
    { id: 2, name: "Livro B", description: "Descrição do Livro B" },
    { id: 3, name: "Livro C", description: "Descrição do Livro C" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const regex = new RegExp(query, "i");
      const results = fakeBooks.filter((book) => regex.test(book.name));
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
  };

  const handleSearch = () => {
    const book = fakeBooks.find((b) => b.name.toLowerCase() === searchQuery.toLowerCase());
    if (book) {
      setSelectedBook({ name: book.name });
      setNotification({ message: "Livro encontrado!", type: "success" });
    } else {
      setSelectedBook(null);
      setNotification({ message: "Livro não encontrado!", type: "error" });
    }

    setSearchQuery("");
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  const handleSelectOption = (book) => {
    setSelectedBook({ name: book.name });
    setFilteredBooks([]);
    setSearchQuery("");
  };

  const handleDelete = () => {
    setShowConfirmPopup(true);
  };

  const confirmDelete = () => {
    setNotification({ message: "Livro excluído com sucesso!", type: "success" });
    setSelectedBook(null);
    setShowConfirmPopup(false);
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  const cancelDelete = () => {
    setNotification({ message: "Exclusão cancelada!", type: "error" });
    setShowConfirmPopup(false);
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  return (
    <div className="delete-book-container">
      <div className={`delete-book ${showConfirmPopup ? "blurred" : ""}`}>
        <div className="card">
          <h2>Excluir Livro</h2>

          <div className="search">
            <input
              type="text"
              placeholder="Digite o nome do livro"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>
              <MagnifyingGlass size={20} weight="light" />
            </button>
          </div>

          {filteredBooks.length > 0 && (
            <ul className="dropdown">
              {filteredBooks.map((book) => (
                <li key={book.id} onClick={() => handleSelectOption(book)}>
                  {book.name}
                </li>
              ))}
            </ul>
          )}

          {selectedBook && (
            <div className="selected-book">
              <h3>{selectedBook.name}</h3>
              <button className="delete-button" onClick={handleDelete}>
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      {showConfirmPopup && (
        <div className="confirm-popup">
          <p>Você tem certeza que deseja excluir este livro?</p>
          <div className="popup-actions">
            <button onClick={confirmDelete}>Sim</button>
            <button onClick={cancelDelete}>Não</button>
          </div>
        </div>
      )}

      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
