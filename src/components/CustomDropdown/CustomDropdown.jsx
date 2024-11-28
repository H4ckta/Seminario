import React, { useState } from "react";
import "./CustomDropdown.css";

const CustomDropdown = ({ options, placeholder, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);

  // Atualiza o campo de entrada e filtra as opções
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtrar opções usando regex
    const regex = new RegExp(value, "i"); // "i" para case insensitive
    const results = options.filter((option) => regex.test(option));
    setFilteredOptions(results);

    // Mostra o dropdown se houver opções
    setIsOpen(results.length > 0);
  };

  // Seleciona uma opção
  const handleSelectOption = (option) => {
    setInputValue(option); // Preenche o campo com a opção selecionada
    setIsOpen(false); // Fecha o dropdown
    if (onSelect) onSelect(option); // Chama o callback de seleção
  };

  return (
    <div className="custom-dropdown">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => setIsOpen(filteredOptions.length > 0)} // Abre ao focar
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Fecha com atraso
      />
      {isOpen && (
        <ul className="dropdown-options">
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
