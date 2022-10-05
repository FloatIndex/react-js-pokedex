import { useEffect, useState } from "react";

// MY COMPONENTS
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
        res.data.results.forEach((pokemon) => {
          axios.get(pokemon.url).then((res) => {
            setPokemonList((prevList) => [...prevList, res.data]);
            //console.log(res.data)
          });
        });
        setIsLoading(false);
        setIsError(false);
      })
      .catch((_err) => {
        setIsLoading(false);
        setIsError(true);
      });
      console.log("loadMore", loadMore);
  }, [loadMore]);

  const handleLoad = () => {
    setLoadMore(prevState => prevState + 20);
  }

  return (
    <main id="pokedex" style={{position: "relative"}}>
      <h1>POK&Eacute;DEX</h1>

      <div className="container">
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
                mainType={pokemon.types[0].type.name}
              />
            ))}
          </ul>
        )}
      </div>

      <button onClick={() => {handleLoad()}}>More please!</button>
    </main>
  );
}

export default PokemonList;
