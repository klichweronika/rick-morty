import { useHistory, useParams } from "react-router-dom";
import { CharacterDetails, useCharacter } from "../UseCharacter";
import Character from "./Character";

import "./CharacterContainer.scss";

const CharacterContainer = () => {
  const { id } = useParams<{ id: string }>();
  const character = useCharacter(id);
  const history = useHistory();

  return (
    <div className="character-container">
      <button
        className="character-container__back-button"
        onClick={() => history.push("/")}
      >
        Go back
      </button>

      <div className="character-container__frame">
        {character && (
          <Character character={character}>
            <hr />
            <CharacterDetailsComponent {...character} />
          </Character>
        )}
      </div>
    </div>
  );
};

const CharacterDetailsComponent = (character: CharacterDetails) => {
  const preposition = character && character.gender === "Male" ? "He" : "She";

  return (
    <div className="adittional-info">
      <p className="adittional-info__paragraph">
        {preposition} was present in {character.episodes.length} episodes.
      </p>
      <p className="adittional-info__paragraph">
        {preposition} currently lives on {character.location.name}.
      </p>
      <p className="adittional-info__paragraph">
        {preposition} was born on {character.origin.name}.
      </p>
    </div>
  );
};

export default CharacterContainer;
