import { PropsWithChildren } from "react";
import { CharacterInfo } from "../UseCharacter";

import "./Character.scss";

type CharacterProps = {
  character: CharacterInfo;
  onClick?: () => void;
};

const Character = ({
  character,
  onClick,
  children,
}: PropsWithChildren<CharacterProps>) => {
  const { image, name, isActive, gender, species } = character;

  return (
    <div
      className={children ? "character" : "character--clickable"}
      onClick={onClick}
    >
      <img src={image} alt={name} className="character__image" />
      <div className="character__info">
        <h1 className="character__header">Name: {name}</h1>
        <h1 className="character__header">
          Status:{" "}
          <span
            className={
              isActive ? "character__status--active" : "character__status"
            }
          />
        </h1>
        <h1 className="character__header">Gender: {gender}</h1>
        <h1 className="character__header">Species: {species}</h1>
      </div>

      {children}
    </div>
  );
};

export default Character;
