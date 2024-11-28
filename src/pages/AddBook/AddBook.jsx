import React, { useState } from "react";
import "./AddBook.css";

const AddBook = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.description) {
      setNotification({ message: "Livro cadastrado com sucesso!", type: "success" });
      setFormData({ name: "", description: "" }); // Limpa o formulário
    } else {
      setNotification({ message: "Preencha todos os campos!", type: "error" });
    }

    // Remove o popup após 5 segundos
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  return (
    <div className="add-book">
      <div className="card">
        <h2>Cadastrar Livro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome do Livro"
            value={formData.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Descrição do Livro"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit">Cadastrar</button>
        </form>
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

export default AddBook;
