import React from "react";
import { Routes, Route } from "react-router-dom";

// MY COMPONENTS
import PokedexLayout from "layouts/PokedexLayout";
import Pokedex from "pages/Pokedex";
import PokemonDetail from "pages/PokemonDetail";
import Home from "pages/Home";
import NotFound from "pages/NotFound";

// CONSTANTS
import { ROUTES } from "utils/routingConstants";

// STYLE
import "assets/sass/style.scss"

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<PokedexLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.POKEMON_LIST} element={<Pokedex />} />
          <Route path={ROUTES.POKEMON_DETAIL} element={<PokemonDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
