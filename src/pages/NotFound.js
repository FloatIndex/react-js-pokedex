import { Link } from "react-router-dom";

import pokedexIcon from "assets/images/pokedex_icon.png";

function NotFound() {
  return (
    <div id="not-found">
      <h1>It seems like you got lost in the tall grass...let's go back safe and
      sound.</h1>
      <Link to="/"><img src={pokedexIcon} alt={"home"}/></Link>
    </div>
  );
}

export default NotFound;
