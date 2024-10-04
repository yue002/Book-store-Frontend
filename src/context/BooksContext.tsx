import React, { createContext, useState, ReactNode } from 'react';

interface BooksContextType {
  books: any[];
  setBooks: (books: any[]) => void;
}

export const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<any[]>([]);
  
  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
