import React from "react";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Tapbar from "./components/tapbar";
import { BrowserRouter as Router } from "react-router-dom";

import Rotas from "./routes";

function App() {
  const [isCartVisible, setIsCartVisible] = useState(true);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };
  return (
    <CartProvider>
      <Router>
        <div>
          <Tapbar isCartVisible={isCartVisible} toggleCart={toggleCart} />
          <Rotas setIsCartVisible={setIsCartVisible} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
