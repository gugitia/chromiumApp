import React, { useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function RegisterUser() {
  const [nomeCompleto, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      nomeCompleto,
      email,
      senha,
      usuario,
    };
    try {
      const response = await api.post("/usuario", data);
      alert("Cadastro concluído, Obrigado.");
      response.status(201).json(response);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="registro-user-container">
      <div className="registro-user-forms">
        <form className="registro-user" onSubmit={handleRegister}>
          <h2>Cadastro Usuario</h2>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome completo"
            value={nomeCompleto}
            onChange={(e) => setNome(e.target.value)}
          />
          <label>Senha</label>
          <input
            type="password"
            placeholder="******"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Nome de usuario</label>
          <input
            type="text"
            placeholder="User"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}
