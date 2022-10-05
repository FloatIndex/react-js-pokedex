import { useState } from "react";

import PokemonModal from "./PokemonModal";

function PokemonCard({ name, image, mainType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <li className="pokemon"onClick={() => {setIsOpen(true); console.log(isOpen)}}>
      <div className={`c-type-${mainType}`}  >
        <div className="txt-wrapper">
          <h3>{name}</h3>
          <small>{mainType}</small>
        </div>
        <div className="img-wrapper">
          <img src={image} alt={name} />
        </div>
      </div>
    </li>
    {isOpen && <PokemonModal setIsOpen={setIsOpen} name={name} />}
    </>
  );
}

export default PokemonCard;
