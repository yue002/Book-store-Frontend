import React, { createContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartItems: any[];
  setCartItems: (items: any[]) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};