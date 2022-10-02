import { Link } from "react-router-dom";

// CONSTANTS
import { ROUTES } from "utils/routingConstants";

function Pokemon({ name, image }) {
  return (
    <li>
      <Link to={ROUTES.POKEMON_DETAIL} className="pokemon">
        <h3>{name}</h3>
        <img src={image} alt={name} />
      </Link>
    </li>
  );
}

export default Pokemon;
