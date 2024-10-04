import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import useFetch from '../../hooks/useFetch';

interface Book {
  id: number;
  title: string;
  coverImage: string;
  description: string;
}

const Cart = () => {
  const cartContext = useContext(CartContext); // รับ CartContext
  
  if (!cartContext) {
    return <div>Error: CartContext is not available.</div>; // ตรวจสอบว่า cartContext ไม่เป็น undefined
  }

  const { cartItems } = cartContext; // ดึง cartItems ออกจาก cartContext
  const { data: books, loading, error } = useFetch<Book[]>('/books'); // กำหนดให้เป็นอาร์เรย์ของ Book

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item) => {
        const book = books?.find((b) => b.id === item.bookId); // ตรวจสอบว่า books ไม่เป็น undefined
        return (
          <div key={item.bookId}>
            {book ? (
              <>
                <h3>{book.title}</h3>
                <p>Quantity: {item.amount}</p>
                <img src={book.coverImage} alt={book.title} />
              </>
            ) : (
              <p>Book not found</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
