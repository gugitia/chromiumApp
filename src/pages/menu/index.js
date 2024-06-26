import React, { useState } from "react";
/*import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";*/

import "./styles.css";
import Tapbar from "../../components/tapbar";
import "../../global.css";
/*import api from "../../services/api";*/

export default function Logon() {
  const [u_Id, setId] = useState("");
  /*const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("login", { u_Id });

      console.log(response.data.u_Nome);

      localStorage.setItem("u_Id", u_Id);
      localStorage.setItem("u_Nome", response.data.u_Nome);

       navigate("/perfil");
    } catch (err) {
      alert("falha de login");
    }
  }*/

  return (
    <div className="logon-container">
      <Tapbar />
    </div>
  );
}
