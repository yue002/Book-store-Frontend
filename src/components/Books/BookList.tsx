import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import useFetch from '../../hooks/useFetch';

interface Book {
  id: number;
  title: string;
  coverImage: string;
  description: string;
}

const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);
  
  if (!cartContext) {
    return <div>Error: CartContext is not available.</div>;
  }

  const { cartItems } = cartContext;
  const { data: books, loading, error } = useFetch<Book[]>('/books'); // กำหนดประเภทเป็นอาร์เรย์ของ Book

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item) => {
        const book: Book | undefined = books?.find((b) => b.id === item.bookId); // กำหนดประเภทให้กับ book

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

