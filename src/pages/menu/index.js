import React, { useState } from "react";
/*import { Link, useNavigate } from "react-router-dom";*/

import "./styles.css";
import Tapbar from "../../components/tapbar";
import Navbar from "../../components/navbar";
import "../../global.css";

export default function Logon() {
  return (
    <div className="logon-container">
      <Tapbar />
      <Navbar />
    </div>
  );
}
