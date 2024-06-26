import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Tapbar() {
  return (
    <div className="tapbar-container">
      <Link to="/">
        <h3>Chromium !!</h3>
      </Link>
      <div className="tapbar-buttons">
        <input type="text" className="search" placeholder="buscar" />
        <button className="favoritos">
          <FiHeart />
        </button>
        <button className="carrinho">
          <FiShoppingCart />
        </button>
        <Link to="/login">
          <button className="login">
            <FiUser />
          </button>
        </Link>
      </div>
    </div>
  );
}
