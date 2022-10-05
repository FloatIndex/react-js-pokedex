import { Link } from "react-router-dom";

// CONSTANTS
import { ROUTES } from "utils/routingConstants";

function Pokemon({ name, image, mainType }) {
  return (
    <li className="pokemon">
      <Link to={ROUTES.POKEMON_DETAIL} className={`c-type-${mainType}`} >
        <div className="txt-wrapper">
          <h3>{name}</h3>
          <small>{mainType}</small>
        </div>
        <div className="img-wrapper">
          <img src={image} alt={name} />
        </div>
      </Link>
    </li>
  );
}

export default Pokemon;
