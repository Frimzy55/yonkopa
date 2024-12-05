import React, { useState } from "react";

const NameSearch = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search?name=${search}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Search Names</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter name to search"
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        <h2>Results:</h2>
        <ul>
          {results.map((item) => (
            <li key={item.id}>{item.name}</li> // Adjust `item.id` and `item.name` based on your database schema
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NameSearch;
