// CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setItems((prevItems) => [...prevItems, produto]);
  };

  const removerDoCarrinho = (produto) => {
    setItems((prevItems) => {
      // Encontra o índice do primeiro item correspondente
      const index = prevItems.findIndex((item) => item._id === produto._id);
      if (index !== -1) {
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1); // Remove o item pelo índice encontrado
        return updatedItems;
      }
      return prevItems;
    });
  };

  const limparCarrinho = () => {
    setItems([]);
  };

  const quantidadeTotal = () => {
    return items.length; // Se os itens forem únicos. Se houver quantidade, ajuste aqui
  };

  return (
    <CartContext.Provider
      value={{
        items,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        quantidadeTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
