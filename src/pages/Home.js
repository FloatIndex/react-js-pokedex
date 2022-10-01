import { Link } from "react-router-dom";

// constants
import { ROUTES } from "utils/routingConstants";

function Home() {
    return (
        <div>
            <Link to={ROUTES.POKEMON_LIST}>Go to pokémon list</Link>
        </div>
    );
}

export default Home;