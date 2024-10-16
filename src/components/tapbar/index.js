import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./styles.css";
import Cart from "../cart";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Tapbar() {
  const [user, setUser] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { quantidadeTotal } = useCart();

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="tapbar-container">
      <Link to="/">
        <h3>Chromium</h3>
      </Link>
      <div className="tapbar-buttons">
        <button className="favoritos">
          <FiHeart />
        </button>
        <button className="carrinho" onClick={toggleCart}>
          <FiShoppingCart />
          {quantidadeTotal() > 0 && (
            <span className="badge">{quantidadeTotal()}</span>
          )}
        </button>
        <Link to="/login">
          <button className="login">
            <FiUser />
            {user && <p className="tapbar-profile">{user}</p>}
          </button>
        </Link>
        {isCartVisible && (
          <div className="cart-modal">
            <Cart onClose={toggleCart} />
          </div>
        )}
      </div>
    </div>
  );
}
