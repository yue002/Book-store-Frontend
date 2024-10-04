import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BooksProvider } from './context/BooksContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BookList from './components/Books/BookList';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';
import CategoryList from './components/Categories/CategoryList';
import Payment from './components/Payment/Payment';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <BooksProvider>
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </BooksProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
