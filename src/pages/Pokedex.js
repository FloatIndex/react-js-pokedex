import { useEffect, useState } from "react";

// My components
import Pokemon from "../components/PokemonCard";
import FiltersBar from "components/FiltersBar";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(0);
  const [filters, setFilters] = useState({ groupBy: "all", search: "" });
  const [filteredList, setFilteredList] = useState([]);

  // retrieve pokemon list from API
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
            setPokemonList((prevList) => [
              ...prevList,
              { ...res.data, isCaught: isCaugth },
            ]);
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
    setLoadMore((prevState) => prevState + 20);
  };

  useEffect(() => {
    switch (filters.groupBy) {
      case "caught":
        setFilteredList(
          pokemonList.filter(
            (pokemon) =>
              pokemon.isCaught &&
              pokemon.name.includes(filters.search.toLowerCase())
          )
        );
        break;
      case "not-caught":
        setFilteredList(
          pokemonList.filter(
            (pokemon) =>
              !pokemon.isCaught &&
              pokemon.name.includes(filters.search.toLowerCase())
          )
        );
        break;
      default:
        setFilteredList(
          pokemonList.filter((pokemon) =>
            pokemon.name.includes(filters.search.toLowerCase())
          )
        );
    }
  }, [filters, pokemonList]);

  const handleGroupByChange = (newGroupBy) => {
    setFilters((prevFilters) => ({ ...prevFilters, groupBy: newGroupBy }));
  };

  const handleSearchChange = (newSearch) => {
    setFilters((prevFilters) => ({ ...prevFilters, search: newSearch }));
  };

  const handleCaptivityChange = (pokemonName) => {
    const updatedList = pokemonList.map((pokemon) => {
      if (pokemon.name === pokemonName) {
        return { ...pokemon, isCaught: !pokemon.isCaught };
      }
      return pokemon;
    });
    setPokemonList(updatedList);
  };

  const handleUpdateAll = (action) => {
    let updatedList = [];
    switch (action) {
      case "catch":
        updatedList = pokemonList.map((pokemon) => {
          localStorage.setItem(pokemon.name, "caught");
          return { ...pokemon, isCaught: true };
        });
        break;
      case "release":
        localStorage.clear();
        updatedList = pokemonList.map((pokemon) => {
          return { ...pokemon, isCaught: false };
        });
        break;
      default:
        updatedList = pokemonList;
    }
    setPokemonList(updatedList);
  };

  return (
    <main id="pokedex" style={{ position: "relative" }}>
      <h1>POK&Eacute;DEX</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Couldn't load resources</div>
      ) : (
        <div className="container">
          <FiltersBar
            onGroupByChange={(newGroupBy) => handleGroupByChange(newGroupBy)}
            onSearchChange={(newSearch) => handleSearchChange(newSearch)}
            onUpdateAll={(action) => handleUpdateAll(action)}
          />
          <ul>
            {filteredList.map((filteredPokemon) => (
              <Pokemon
                key={filteredPokemon.name}
                name={filteredPokemon.name}
                image={filteredPokemon.sprites.other.dream_world.front_default}
                types={[...filteredPokemon.types]}
                abilities={[...filteredPokemon.abilities]}
                stats={[...filteredPokemon.stats]}
                isCaughtProp={filteredPokemon.isCaught}
                onCaptivityChange={(pokemonName) =>
                  handleCaptivityChange(pokemonName)
                }
              />
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => {
          handleLoadMore();
        }}
      >
        More please!
      </button>
    </main>
  );
}

export default PokemonList;
