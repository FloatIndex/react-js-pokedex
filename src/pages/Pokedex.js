import { useEffect, useState } from "react";

// MY COMPONENTS
import Pokemon from "../components/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const axios = require("axios").default;
    setIsLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => {
        res.data.results.forEach((pokemon) => {
          axios.get(pokemon.url).then((res) => {
            setPokemonList((prevList) => [...prevList, res.data]);
          });
        });
        setIsLoading(false);
        setIsError(false);
      })
      .catch((_err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <main id="pokedex">
      <h1>POK&Eacute;DEX</h1>

      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Couldn't load resources</div>
        ) : (
          <ul className="list">
            {pokemonList.map((pokemon) => (
              <Pokemon
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default PokemonList;
