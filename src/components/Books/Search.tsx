import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BooksContext } from '../../context/BooksContext';

const Search = () => {
  const booksContext = useContext(BooksContext); // รับ BooksContext
  
  if (!booksContext) {
    return <div>Error: BooksContext is not available.</div>; // ตรวจสอบว่า booksContext ไม่เป็น undefined
  }

  const { setBooks } = booksContext; // ดึง setBooks ออกจาก booksContext
  const [query, setQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.get(`/books?method=search&q=${query}`);
      setBooks(response.data); // Update books context with search results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <h2>Search Books</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book title or keywords"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
