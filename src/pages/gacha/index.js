import React, { useState, useEffect } from "react";
/*import { Link, useNavigate } from "react-router-dom";*/
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { Commet } from "react-loading-indicators";

import api from "../../services/api";
import "./styles.css";

import { useCart } from "../../context/CartContext";
import "../../global.css";

export default function Loja() {
  const [produtos, setProdutos] = useState("");
  const [produto, setProduto] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const { adicionarAoCarrinho } = useCart();

  const handleItemClick = (produto) => {
    setProdutoSelecionado(produto);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".card")) {
      setProdutoSelecionado(null);
    }
  };

  useEffect(() => {
    api.get("/produtos/tag?tag=gacha").then((response) => {
      setProdutos(response.data);
    });
  }, [produto]);

  return (
    <div className="loja-container">
      {produtoSelecionado && (
        <div className="produto-detalhado">
          <p onClick={handleClickOutside}>
            <FiArrowLeft />
          </p>
          <h2>{produtoSelecionado.produto}</h2>
          <img
            src={produtoSelecionado.imagems}
            alt={produtoSelecionado.produto}
            style={{ width: "300px", height: "300px" }}
          />
          <p>Tags: {produtoSelecionado.tags.join(", ")}</p>
          <p className="card-descrip">
            Descrição: {produtoSelecionado.descricao}
          </p>
          <p className="gacha-conteudo">
            Conteudo: {produtoSelecionado.conteudo}
          </p>
          <p className="produto-valor">
            {produtoSelecionado.valor.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <button
            className="add-cart"
            onClick={() => adicionarAoCarrinho(produtoSelecionado)}
          >
            <FiShoppingCart />
          </button>
        </div>
      )}
      <div onClick={handleClickOutside}>
        <div className="grid-container">
          {produtos.length > 0 ? (
            <div className="grid">
              {produtos.map((produto) => (
                <div key={produto._id} className="grid-item">
                  <div className="card">
                    <img
                      src={produto.imagems}
                      className="card-img-top"
                      alt={produto.produto}
                      onClick={() => handleItemClick(produto)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{produto.produto}</h5>
                      <p>{produto.tags.join(", ")}</p>
                      <div className="card-price">
                        <p className="card-text-price">
                          {produto.valor.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>

                        <button
                          className="cart-card"
                          onClick={() => adicionarAoCarrinho(produto)}
                        >
                          <FiShoppingCart />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="commet">
              <Commet color="#fd0f0f" size="medium" text="" textColor="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
