// Images
import pokeballIconClosed from "assets/images/pokeball_icon_closed.png";

function PokemonModal({
  onModalClose,
  name,
  image,
  id,
  types,
  abilities,
  stats,
}) {
  return (
    <>
      <div className="blurred-bg" onClick={onModalClose}></div>
      <div id="modal" className={`c-type-${types[0].type.name}`}>
        <h1>
          #{id} {name}
        </h1>

        <div className="content">
          <img src={image} alt={name} />

          <div>
            <div className="info-wrapper">
              <p><strong>Types: </strong></p>
              <div>
                {types.map((type) => (
                  <small key={type.type.name}>{type.type.name}</small>
                ))}
              </div>
            </div>

            <div className="info-wrapper">
              <p><strong>Abilities: </strong></p>
              <div>
                {abilities.map((ability) => (
                  <small key={ability.ability.name}>
                    {ability.ability.name}
                  </small>
                ))}
              </div>
            </div>

            <div className="info-wrapper">
              <p><strong>Stats: </strong></p>
              <div>
                {stats.map((stat) => (
                  <small key={stat.stat.name}>
                    <strong>{stat.stat.name}:</strong> {stat.base_stat}
                  </small>
                ))}
              </div>
            </div>
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
