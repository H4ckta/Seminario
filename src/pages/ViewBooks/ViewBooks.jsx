import React, { useState } from "react";
import "./ViewBooks.css";

const ViewBooks = () => {
  // Dados fictícios
  const fakeBooks = Array.from({ length: 53 }, (_, i) => ({
    id: i + 1,
    name: `Livro ${i + 1}`,
    description: `Descrição do Livro ${i + 1}`,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar os livros com base no texto digitado
  const filteredBooks = fakeBooks.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Limite de botões de paginação exibidos
  const maxPageButtons = 10;
  const startPage = Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  // Alterar a página
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="view-books">
      <div className="card">
        <h2>Visualizar Livros</h2>

        {/* Campo de pesquisa */}
        <div className="search">
          <input
            type="text"
            placeholder="Digite o nome do livro"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabela */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum livro encontrado</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <button
              key={startPage + i}
              onClick={() => handlePageChange(startPage + i)}
              className={currentPage === startPage + i ? "active" : ""}
            >
              {startPage + i}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
