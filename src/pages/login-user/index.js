import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

import api from "../../services/api";

import Tapbar from "../../components/tapbar";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/login/user", { email, senha });
      localStorage.setItem("usuario", response.data.usuario);
      console.log(localStorage.getItem("usuario"));
      alert("login feito com sucesso");
      navigate("/");
    } catch (err) {
      alert("falha de login");
    }
  }
  return (
    <div className="login-user-container">
      <div className="login-user-forms">
        <form className="login-user" onSubmit={handleLogin}>
          <h2>Login User</h2>
          <label>Email</label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha</label>
          <input
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <Link to="/registro">
            <button type="link">Registrar</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
