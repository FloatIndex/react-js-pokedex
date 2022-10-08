import { useEffect, useState } from "react";

// My components
import Pokemon from "../components/PokemonCard";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(0);

  useEffect(() => {
    const axios = require("axios").default;
    setIsLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${loadMore}`)
      .then((res) => {
        // because of the structure of the poke-APIs, I need to call a second API
        // for each and every pokemon in order to get their details
        res.data.results.forEach((pokemon) => {
          axios.get(pokemon.url).then((res) => {
            // check if the currently retrieved pokemon has been saved as caught in localStorage 
            const savedAsCaught = localStorage.getItem(res.data.name);
            let isCaugth = false;
            if (savedAsCaught) {
              isCaugth = true;
            }
            // add the property isCaught to the pokemon object being added to the pokemon list
            setPokemonList((prevList) => [...prevList, {...res.data, isCaught: isCaugth}]);
          });
        });
        setIsLoading(false);
        setIsError(false);
      })
      .catch((_err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [loadMore]);

  const handleLoadMore = () => {
    setLoadMore(prevState => prevState + 20);
  }

  return (
    <main id="pokedex" style={{position: "relative"}}>
      <h1>POK&Eacute;DEX</h1>

      <div className="list-container">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Couldn't load resources</div>
        ) : (
          <ul>
            {pokemonList.map((pokemon) => (
              <Pokemon
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                types={[...pokemon.types]}
                abilities={[...pokemon.abilities]}
                stats={[...pokemon.stats]}
                isCaughtProp={pokemon.isCaught}
              />
            ))}
          </ul>
        )}
      </div>

      <button onClick={() => {handleLoadMore()}}>More please!</button>
    </main>
  );
}

export default PokemonList;
