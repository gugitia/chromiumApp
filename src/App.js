import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Rotas from "./routes";

function App() {
  return (
    <Router>
      <div>
        <Rotas />
      </div>
    </Router>
  );
}

export default App;
