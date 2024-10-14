import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

import ProductsStaff from "../../components/staff-products";
import UsersStaff from "../../components/staff-users";
import OrderStaff from "../../components/staff-orders";

import api from "../../services/api";

import Tapbar from "../../components/tapbar";

export default function LoginUser() {
  const [productVisible, setProductsVisible] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);
  const [ordersVisible, setOrdersVisible] = useState(false);

  const toggleProductsVisible = () => {
    setProductsVisible(!productVisible);
    setUsersVisible(false);
    setOrdersVisible(false);
  };

  const toggleUserVisible = () => {
    setUsersVisible(!usersVisible);
    setProductsVisible(false);
    setOrdersVisible(false);
  };

  const toggleOrderVisible = () => {
    setOrdersVisible(!ordersVisible);
    setUsersVisible(false);
    setProductsVisible(false);
  };

  return (
    <div className="manager-container">
      <div className="manager-menu">
        <ul>
          <button onClick={toggleProductsVisible}>
            <li>Produtos</li>
          </button>
          <button onClick={toggleOrderVisible}>
            <li>Pedidos</li>
          </button>
          <button onClick={toggleUserVisible}>
            <li>Usuarios</li>
          </button>
        </ul>
      </div>
      <div className="manager-component">
        {productVisible && (
          <p className="t">
            <ProductsStaff />
          </p>
        )}
        {ordersVisible && (
          <p className="t">
            <OrderStaff />
          </p>
        )}
        {usersVisible && (
          <p className="t">
            <UsersStaff />
          </p>
        )}
      </div>
    </div>
  );
}
