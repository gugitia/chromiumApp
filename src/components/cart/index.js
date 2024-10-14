import "./styles.css";
import React from "react";
import { useCart } from "../../context/CartContext"; // Ajuste o caminho conforme necessário

const Cart = () => {
  const { items, removerDoCarrinho, limparCarrinho } = useCart();
  const valorTotal = items.reduce((acc, item) => acc + item.valor, 0);
  return (
    <div className="cart-container">
      <h2>Carrinho de Compras</h2>
      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul>
            {items.map((item) => (
              <li key={item._id} className="cart-line">
                <img
                  src={item.imagems}
                  alt={item.produto}
                  style={{ width: "90px", height: "90px" }}
                />
                <h5 className="cart-name">{item.produto}</h5>
                <p>
                  Preço:{" "}
                  {item.valor.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <button onClick={() => removerDoCarrinho(item)}>X</button>
              </li>
            ))}
          </ul>
          <p className="total-price">
            Valor Total:{" "}
            {valorTotal.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <button className="shop-button">Comprar</button>
          <button className="clear-button" onClick={limparCarrinho}>
            Limpar Carrinho
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
