import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export type CharacterInfo = {
  id: number;
  image: string;
  name: string;
  gender: string;
  species: string;
  isActive: boolean;
};

export type CharacterDetails = {
  episodes: string[];
  location: Location;
  origin: Origin;
} & CharacterInfo;

export type Location = {
  name: string;
  url: string;
};

export type Origin = {
  name: string;
  url: string;
};

export type CharacterResponse = {
  id: number;
  image: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  gender: string;
  species: string;
  location: Location;
  origin: Origin;
  episode: string[];
};

type CharacterPagingResponse = {
  results: CharacterResponse[];
};

const charactersBaseApi = "https://rickandmortyapi.com/api";

export const useCharacter = (id: string): CharacterDetails | undefined => {
  const [character, setCharacter] = useState<CharacterDetails | undefined>(
    undefined
  );

  useEffect(() => {
    axios
      .get(`${charactersBaseApi}/character/${id}`)
      .then(({ data }: AxiosResponse<CharacterResponse>) => {
        const mappedCharacter = {
          id: data.id,
          isActive: data.status === "Alive",
          gender: data.gender,
          name: data.name,
          image: data.image,
          detailsAvailable: data.species === "Human",
          species: data.species,
          episodes: data.episode,
          location: data.location,
          origin: data.origin,
        } as CharacterDetails;

        setCharacter(mappedCharacter);
      })
      .catch((error) => handleError(error));
  }, [id]);

  return character;
};

export const useCharacters = (page: number): CharacterInfo[] => {
  const [lastActivePage, setLastActivePage] = useState<number | undefined>(
    undefined
  );
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);

  useEffect(() => {
    if (lastActivePage && lastActivePage >= page) {
      return;
    }

    axios
      .get(`${charactersBaseApi}/character?page=${page}`)
      .then(({ data }: AxiosResponse<CharacterPagingResponse>) => {
        const mappedCharacters = data.results.map(
          (character) =>
            ({
              id: character.id,
              isActive: character.status === "Alive",
              gender: character.gender,
              name: character.name,
              image: character.image,
              species: character.species,
            } as CharacterInfo)
        );

        setCharacters((currentCharacters) => [
          ...currentCharacters,
          ...mappedCharacters,
        ]);

        setLastActivePage(page);
      })
      .catch((error) => handleError(error));
  }, [lastActivePage, page]);

  return characters;
};

const handleError = (error: Error) => {
  toast(`Error occured: ${error.message}`, {
    type: "error",
  });
};
