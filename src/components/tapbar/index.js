import React, { useEffect, useState, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./styles.css";
import Cart from "../cart";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Tapbar() {
  const [user, setUser] = useState("");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { quantidadeTotal } = useCart();
  const cartRef = useRef(null);

  useEffect(() => {
    setUser(localStorage.getItem("usuario"));
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartVisible(false);
      }
    };

    // Adiciona o event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Remove o event listener ao desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="tapbar-container">
      <Link to="/">
        <img
          src="/images/drake.png"
          alt="logo-chromium"
          className="logo-image"
        />
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
            {/*} <p className="tapbar-profile">{localStorage.getItem("usuario")}</p> */}
          </button>
        </Link>
        {isCartVisible && (
          <div ref={cartRef} className="cart-modal">
            <Cart onClose={toggleCart} />
          </div>
        )}
      </div>
    </div>
  );
}
