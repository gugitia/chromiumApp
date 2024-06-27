import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";
import Tapbar from "../../components/tapbar";

export default function LoginStaff() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/login/staff", { email, senha });
      localStorage.setItem("email", email);
      console.log(response);
      alert("login feito com sucesso");
      navigate("/adm");
    } catch (err) {
      alert("falha de login");
    }
  }

  return (
    <div className="login-staff-container">
      <Tapbar />
      <div className="login-staff-forms">
        <form className="login-staff" onSubmit={handleLogin}>
          <h2>Login Staff</h2>
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
        </form>
      </div>
    </div>
  );
}
