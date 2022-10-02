import { useState } from "react";
import { Link } from "react-router-dom";

// CONSTANTS
import { ROUTES } from "utils/routingConstants";

function PokemonCard({ name }) {
    const [specs, setSpecs] = useState([]);

    const handleClick = () => {
        const axios = require("axios").default;
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => setSpecs(res.data.abilities));
    }

    return (
        <div>
            <Link
                to={ROUTES.POKEMON_DETAIL}
                onClick={() => handleClick(name)}
            >
                {name}
            </Link>
        </div>
    );
}

export default PokemonCard;