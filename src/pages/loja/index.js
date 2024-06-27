import React, { useState, useEffect } from "react";
/*import { Link, useNavigate } from "react-router-dom";*/

import api from "../../services/api";
import "./styles.css";

import Tapbar from "../../components/tapbar";
import Navbar from "../../components/navbar";
import "../../global.css";

export default function Loja() {
  const [produtos, setProducts] = useState("");

  useEffect(() => {
    api.get("produtos").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <div className="logon-container">
      <Tapbar />
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
                  />
                  <div className="card-body">
                    <p className="card-text-price">R$ {produto.valor}</p>
                    <h5 className="card-title">{produto.produto}</h5>
                    <p className="card-text-desc">{produto.descricao}</p>
                  </div>
                  <div className="buy-button"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
