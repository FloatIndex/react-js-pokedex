import React from "react";
import { Routes, Route } from "react-router-dom";

// MY COMPONENTS
import PokedexLayout from "layouts/PokedexLayout";
import Pokedex from "pages/Pokedex";
import NotFound from "pages/NotFound";

// STYLE
import "assets/sass/style.scss"

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<PokedexLayout />}>
          <Route index element={<Pokedex />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
