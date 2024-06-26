import React, { useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function RegisterUser() {
  const [nomeCompleto, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [nasc, setNasc] = useState("");
  const [cell, setCell] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [endereco, setEndereco] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      nomeCompleto,
      email,
      cpf,
      nasc,
      cell,
      senha,
      usuario,
      endereco,
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
      <div className="tapbar-container">
        <Link to="/">
          <h3>Chromium !!</h3>
        </Link>
      </div>
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
          <label>Cpf</label>
          <input
            type="text"
            placeholder="Cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <label>Data de nascimento</label>
          <input
            type="text"
            placeholder="Nascimento"
            value={nasc}
            onChange={(e) => setNasc(e.target.value)}
          />
          <label>Numero celular</label>
          <input
            type="text"
            placeholder="(+55) 11 99999-9999"
            value={cell}
            onChange={(e) => setCell(e.target.value)}
          />
          <label>Nome de usuario</label>
          <input
            type="text"
            placeholder="User"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label>Endereço</label>
          <input
            type="text"
            placeholder="R. Augusta, 589"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}
