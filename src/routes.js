import React from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./pages/menu";
import Logon from "./pages/login-user";
import Register from "./pages/register-user";
import LogonStaff from "./pages/login-staff";
import StaffManager from "./pages/staff-manager";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/login" element={<Logon />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/staff-login" element={<LogonStaff />} />
      <Route path="/adm" element={<StaffManager />} />
    </Routes>
  );
};

export default Rotas;
