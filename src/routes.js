import React from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./pages/menu";
import Logon from "./pages/login-user";
import Register from "./pages/register-user";
import LogonStaff from "./pages/login-staff";
import StaffManager from "./pages/staff-manager";
import Store from "./pages/loja";
import Comprar from "./pages/comprar";
import MontarKit from "./pages/montarKit";
import Gacha from "./pages/gacha";

import ProtectedRoute from "./protectedRoutes";

const isUserAuthenticated = () => {
  const user = localStorage.getItem("usuario");
  return user;
};

const isEmployeeAuthenticated = () => {
  const employeeToken = localStorage.getItem("funcionario");
  return employeeToken;
};

const Rotas = ({ setIsCartVisible }) => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/login" element={<Logon />} />
      <Route path="/staff-login" element={<LogonStaff />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/loja" element={<Store />} />
      <Route path="/montar-kit" element={<MontarKit />} />
      <Route path="/gacha" element={<Gacha />} />
      <Route
        path="/comprar"
        element={
          <ProtectedRoute
            isAuthorized={isUserAuthenticated}
            redirectTo="/login"
          >
            <Comprar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adm"
        element={
          <ProtectedRoute
            isAuthorized={isEmployeeAuthenticated}
            redirectTo="/staff-login"
          >
            <StaffManager />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Rotas;
