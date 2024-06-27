import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";

export default function ProductsStaff() {
  const [produtos, setProducts] = useState(null);

  useEffect(() => {
    api.get("produtos").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="products-staff-container">
      {produtos ? (
        <table className="staff-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Imagem</th>
              <th>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto._id}>
                <td>{produto._id}</td>
                <td>{produto.produto}</td>
                <td>{produto.descricao}</td>
                <td>R$ {produto.valor.toFixed(2)}</td>
                <td>
                  <img
                    src={produto.imagems}
                    alt={produto.produto}
                    width="100"
                  />
                </td>
                <td>{new Date(produto.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
