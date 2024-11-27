import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <section className="navbar-list">
        <ul>
          <Link to="/loja">
            <li>Loja</li>
          </Link>
          <Link to="montar-kit">
            <li>Monte seu Kit !</li>
          </Link>

          <li>Miniaturas Personalizados</li>
          <li>Nossos Kits</li>
          <li>Sobre Nós</li>
        </ul>
      </section>
    </div>
  );
}
