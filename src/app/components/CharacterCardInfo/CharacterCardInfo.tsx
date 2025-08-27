import { FavouriteButton } from "../FavouriteButton/FavouriteButton";
import { CharacterItem, useContextApp } from "../../context/Context";

export const CharacterCardInfo = (props: CharacterItem) => {
  const { addFavorite, removeFavorite, isFavorite } = useContextApp();

  const toggleFavorite = () => {
    if (isFavorite(props.id)) {
      removeFavorite(props.id);
    } else {
      addFavorite(props);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-4 pt-4 pb-6 bg-black border-t">
      <h3 className="font-bold text-lg text-white">{props.name}</h3>
      <FavouriteButton
        width={24}
        height={24}
        isFavorite={isFavorite(props.id)}
        onClick={toggleFavorite}
      />
    </div>
  );
};
