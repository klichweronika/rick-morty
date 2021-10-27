import { useState } from "react";
import { useHistory } from "react-router-dom";
import Character from "./character/Character";
import { useCharacters } from "./UseCharacter";
import { CharacterRoute } from "./CharactersRoutes";

import "./CharactersPage.scss";

const CharactersPage = () => {
  const history = useHistory();
  const [page, setActivePage] = useState(1);
  const characters = useCharacters(page);

  return (
    <>
      <div className="characters-page">
        {characters.map((character) => (
          <Character
            key={character.id}
            character={character}
            onClick={() => history.push(CharacterRoute(character.id))}
          />
        ))}
      </div>
      <div className="characters-page__load-more">
        {
          <button
            className="characters-page__button"
            type="button"
            onClick={() => {
              setActivePage(page + 1);
            }}
          >
            Load more
          </button>
        }
      </div>
    </>
  );
};

export default CharactersPage;
