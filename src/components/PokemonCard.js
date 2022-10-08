import { useState } from "react";

// My components
import PokemonModal from "./PokemonModal";

// Images
import pokeballIconClosed from "assets/images/pokeball_icon_closed.png";
import pokeballIconOpened from "assets/images/pokeball_icon_opened.png";

function PokemonCard({
  name,
  image,
  types,
  abilities,
  stats,
  onCaptivityChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCatch = (e) => {
    onCaptivityChange(name);
    localStorage.setItem(name, "caught");
    e.stopPropagation();
  };

  const handleRelease = (e) => {
    onCaptivityChange(name);
    localStorage.removeItem(name);
    e.stopPropagation();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li
        className="pokemon-card"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <div className={`c-type-${types[0].type.name} card-container`}>
          <div className="txt-wrapper">
            <h2>{name}</h2>
            <small>{types[0].type.name}</small>
          </div>

          {localStorage.getItem(name) ? (
            <div className="icon-wrapper">
              <img
                className="pokeball-icon closed"
                src={pokeballIconClosed}
                alt="closed pokeball"
              />

              <img
                className="pokeball-icon opened"
                src={pokeballIconOpened}
                alt="opened pokeball"
                onClick={(e) => handleRelease(e)}
              />
            </div>
          ) : (
            <button
              onClick={(e) => {
                handleCatch(e);
              }}
            >
              catch it!
            </button>
          )}

          <div className="img-wrapper">
            <img src={image} alt={name} />
          </div>
        </div>
      </li>
      {isModalOpen && (
        <PokemonModal
          onModalClose={() => handleModalClose()}
          image={image}
          name={name}
          types={types}
          abilities={abilities}
          stats={stats}
        />
      )}
    </>
  );
}

export default PokemonCard;
