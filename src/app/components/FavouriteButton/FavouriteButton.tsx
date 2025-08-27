import Image from "next/image";
import FilledHeart from "../../../../public/FilledHeart.svg";
import EmptyHeart from "../../../../public/EmptyHeart.svg";

interface FavouriteButtonProps {
  width: number;
  height: number;
  isFavorite: boolean;
  onClick: () => void;
}

export const FavouriteButton = ({
  width,
  height,
  isFavorite,
  onClick,
}: FavouriteButtonProps) => {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <Image
        src={isFavorite ? FilledHeart : EmptyHeart}
        alt="Heart Icon"
        width={width}
        height={height}
      />
    </button>
  );
};
