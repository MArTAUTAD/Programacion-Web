"use client";


import React, { useState } from "react";

const SearchBar = ({ data, onSearch, placeholder = "Buscar..." }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    // Filtrar los datos y pasar el resultado a la función onSearch
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery) // Ajusta según las propiedades del objeto
    );
    onSearch(filteredData);
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default SearchBar;
