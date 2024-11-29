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

const Rotas = ({ setIsCartVisible }) => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/login" element={<Logon />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/staff-login" element={<LogonStaff />} />
      <Route path="/adm" element={<StaffManager />} />
      <Route path="/loja" element={<Store />} />
      <Route path="/montar-kit" element={<MontarKit />} />
      <Route path="/gacha" element={<Gacha />} />
      <Route
        path="/comprar"
        element={<Comprar setIsCartVisible={setIsCartVisible} />}
      />
    </Routes>
  );
};

export default Rotas;
