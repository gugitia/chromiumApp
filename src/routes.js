import React from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./pages/menu";
import Logon from "./pages/login-user";
import Register from "./pages/register-user";
import LogonStaff from "./pages/login-staff";
import RegisterStaff from "./pages/register-staff";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/login" element={<Logon />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/staff-login" element={<LogonStaff />} />
      <Route path="/staff-registro" element={<RegisterStaff />} />
    </Routes>
  );
};

export default Rotas;
