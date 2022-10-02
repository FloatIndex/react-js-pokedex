import { useEffect, useState } from "react";

// MY COMPONENTS
import PokemonCard from "../components/PokemonCard";

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
        setPokemonList(res.data.results);
        setIsLoading(false);
      })
      .catch((_err) => {
        setIsError(true);
      });
  }, []);

  return (
    <main id="pokedex">
      <h1>POK&Eacute;MON LIST</h1>

      {isError && <div>Couldn't load resources</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {pokemonList.map((pokemon) => (
            <li key={pokemon.name}>
              <PokemonCard name={pokemon.name}/>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default PokemonList;
