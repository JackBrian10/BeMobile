"use client";
import Image from "next/image";
import { FavouriteButton } from "../FavouriteButton/FavouriteButton";
import { useContextApp } from "../../context/Context";

interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Props {
  character: Character;
}

export const CharacterBanner = ({ character }: Props) => {
  const { addFavorite, removeFavorite, isFavorite } = useContextApp();

  const toggleFavorite = () => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <div className="flex flex-row bg-black w-full px-12 gap-6">
      <Image
        src={character.image}
        alt={character.name}
        width={800}
        height={400}
        className="object-cover rounded-lg"
      />
      <div className="flex flex-col justify-center gap-6 w-full p-12">
        <div className="flex flex-row justify-between w-full items-center">
          <h1 className="text-white text-3xl font-bold drop-shadow-lg">
            {character.name}
          </h1>
          <FavouriteButton
            width={24}
            height={24}
            isFavorite={isFavorite(character.id)}
            onClick={toggleFavorite}
          />
        </div>
        <p className="text-white text-base">{character.description}</p>
      </div>
    </div>
  );
};
