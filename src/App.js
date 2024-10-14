import React from "react";
import { CartProvider } from "./context/CartContext";
import Tapbar from "./components/tapbar";
import { BrowserRouter as Router } from "react-router-dom";

import Rotas from "./routes";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Tapbar /> {/* Inclua a Navbar aqui */}
          <Rotas /> {/* Suas rotas */}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
