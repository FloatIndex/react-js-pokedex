import { Link } from "react-router-dom";

// CONSTANTS
import { ROUTES } from "utils/routingConstants";

function PokemonList() {
  return (
    <div>
      Pokemon List
      <ul>
        <li>
          <Link to={ROUTES.POKEMON_DETAIL}>First pokémon</Link>
        </li>
      </ul>
    </div>
  );
}

export default PokemonList;
