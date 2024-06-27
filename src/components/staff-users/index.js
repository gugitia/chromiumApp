import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";

export default function UsersStaff() {
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    api.get("usuario").then((response) => {
      setUsuarios(response.data);
    });
  }, []);

  return (
    <div className="users-staff-container">
      {usuarios ? (
        <table className="staff-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Cell</th>
              <th>Criação</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario._id}</td>
                <td>{usuario.nomeCompleto}</td>
                <td>{usuario.email}</td>
                <td>{usuario.cell}</td>
                <td>{new Date(usuario.createdAt).toLocaleDateString()}</td>
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
