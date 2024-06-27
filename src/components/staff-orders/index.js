import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";

export default function OrderStaff() {
  const [ordens, setOrdens] = useState(null);

  useEffect(() => {
    api.get("ordem").then((response) => {
      setOrdens(response.data);
    });
  }, []);

  return (
    <div className="order-staff-container">
      {ordens ? (
        <table className="staff-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Comprador</th>
              <th>Produtos</th>
              <th>Local</th>
              <th>Valor</th>
              <th>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {ordens.map((ordem) => (
              <tr key={ordem._id}>
                <td>{ordem._id}</td>
                <td>{ordem.usuarioId}</td>
                <td>{ordem.produtosId}</td>
                <td>{ordem.local}</td>
                <td>R$ {ordem.valor.toFixed(2)}</td>
                <td>{ordem.data.compra}</td>
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
