import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <section className="navbar-list">
        <ul>
          <li>Monte seu Kit !</li>
          <li>Nossos Kits</li>
          <li>Personalizados</li>
          <Link to="/loja">
            <li>Loja</li>
          </Link>
        </ul>
      </section>
    </div>
  );
}
