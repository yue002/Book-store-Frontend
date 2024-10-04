import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

interface Book {
  title: string;
  coverImage: string;
  description: string;
}

const BookDetails: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: books, loading, error } = useFetch<Book[]>(`/books/${bookId}`); // กำหนดให้เป็นอาร์เรย์ของ Book

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // ตรวจสอบว่า books ไม่เป็น null หรือ undefined
  if (!books || books.length === 0) {
    return <p>No book found</p>; // ถ้า books ไม่มีค่า ให้แสดงข้อความนี้
  }

  const book = books[0]; // เข้าถึง book ตัวแรกจากอาร์เรย์

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.coverImage} alt={book.title} />
      <p>{book.description}</p>
      {/* Add additional details or buttons for actions */}
    </div>
  );
};

export default BookDetails;
