import React from "react";
import "./styles.css";

export default function Tapbar() {
  return (
    <div className="tapbar-container">
      <h3>Chromium !!</h3>
      <div className="tapbar-buttons">
        <input type="text" className="search" placeholder="buscar" />
        <button className="favoritos" />
        <button className="carrinho" />
        <button className="login" />
      </div>
    </div>
  );
}
