// Images
import pokeballIconClosed from "assets/images/pokeball_icon_closed.png";

function PokemonModal({
  onModalClose,
  name,
  image,
  types,
  abilities,
  stats,
}) {
  return (
    <>
      <div className="blurred-bg" onClick={onModalClose}></div>
      <div id="modal">
        <h1>{name}</h1>

        <div className="content">
          <img src={image} alt={name} />

          <div className="info-wrapper">
            <p>Types: </p>
            {types.map((type) => (
              <small key={type.type.name}>{type.type.name}</small>
            ))}

            <p>Abilities: </p>
            {abilities.map((ability) => (
              <small key={ability.ability.name}>{ability.ability.name}</small>
            ))}

            <p>Stats: </p>
            {stats.map((stat) => (
              <small key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </small>
            ))}
          </div>
        </div>

        {localStorage.getItem(name) ? (
          <img
            className="pokeball-icon closed hidden"
            src={pokeballIconClosed}
            alt="closed pokeball"
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default PokemonModal;
