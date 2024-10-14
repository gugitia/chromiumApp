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
          <li>Monte seu Kit !</li>
          <li>Nossos Kits</li>
          <li>Miniaturas Personalizados</li>
          <li>Sobre Nós</li>
        </ul>
      </section>
    </div>
  );
}
