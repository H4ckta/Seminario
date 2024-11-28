import React, { useState } from "react";
import { MagnifyingGlass } from "phosphor-react"; // Ícone de lupa
import "./EditBook.css";

const EditBook = () => {
  // Dados fictícios
  const fakeBooks = [
    { id: 1, name: "Livro A", description: "Descrição do Livro A" },
    { id: 2, name: "Livro B", description: "Descrição do Livro B" },
    { id: 3, name: "Livro C", description: "Descrição do Livro C" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Atualiza o campo de input conforme o usuário digita
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

  // Pesquisa o livro quando o botão de lupa é clicado
  const handleSearch = () => {
    const book = fakeBooks.find((b) => b.name.toLowerCase() === searchQuery.toLowerCase());
    if (book) {
      setSelectedBook(book); // Define o livro selecionado
      setNotification({ message: "Livro encontrado!", type: "success" });
    } else {
      setSelectedBook(null); // Limpa os dados
      setNotification({ message: "Livro não encontrado!", type: "error" });
    }

    setSearchQuery(""); // Limpa o campo de pesquisa
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  // Seleciona uma sugestão de livro
  const handleSelectOption = (book) => {
    setSelectedBook(book); // Define o livro selecionado
    setFilteredBooks([]); // Esconde a lista de sugestões
    setSearchQuery(""); // Limpa o campo de pesquisa
  };

  // Alterar valores nos campos de edição
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook({ ...selectedBook, [name]: value });
  };

  // Salvar as alterações no livro
  const handleSave = () => {
    if (selectedBook?.name && selectedBook?.description) {
      setNotification({ message: "Livro atualizado com sucesso!", type: "success" });
    } else {
      setNotification({ message: "Preencha todos os campos!", type: "error" });
    }

    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  return (
    <div className="edit-book">
      <div className="card">
        <h2>Editar Livro</h2>

        {/* Campo de pesquisa */}
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

        {/* Lista de sugestões */}
        {filteredBooks.length > 0 && (
          <ul className="dropdown">
            {filteredBooks.map((book) => (
              <li key={book.id} onClick={() => handleSelectOption(book)}>
                {book.name}
              </li>
            ))}
          </ul>
        )}

        {/* Formulário de edição ou mensagem de erro */}
        {selectedBook ? (
          <form>
            <input
              type="text"
              name="name"
              placeholder="Nome do Livro"
              value={selectedBook.name}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Descrição do Livro"
              value={selectedBook.description}
              onChange={handleInputChange}
            ></textarea>
            <button type="button" onClick={handleSave}>
              Salvar
            </button>
          </form>
        ) : searchQuery && (
          <p className="not-found">Livro não encontrado!</p>
        )}
      </div>

      {/* Popup de notificação */}
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default EditBook;
