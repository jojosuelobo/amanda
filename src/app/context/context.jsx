"use client";

import { createContext, useContext, useState } from 'react';

// Criando o contexto
const MyContext = createContext();

// Criando o provider para envolver a aplicação
export const MyContextProvider = ({ children }) => {
  const [nome, setNome] = useState(); 

  return (
    <MyContext.Provider value={{ nome, setNome }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook para usar o contexto
export const useMyContext = () => {
  return useContext(MyContext);
};
