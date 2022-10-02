import { Link } from "react-router-dom";

// constants
import { ROUTES } from "utils/routingConstants";

function Home() {
    return (
        <div id="home">
            <Link to={ROUTES.POKEMON_LIST}>Go to pokédex</Link>
        </div>
    );
}

export default Home;