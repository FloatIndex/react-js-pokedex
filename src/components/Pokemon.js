import { Link } from "react-router-dom";

function Pokemon({ name, image, mainType }) {
  return (
    <li className="pokemon">
      <Link to={`/${name}`} className={`c-type-${mainType}`} >
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
