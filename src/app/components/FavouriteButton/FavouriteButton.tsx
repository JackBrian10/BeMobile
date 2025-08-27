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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <button onClick={handleClick} className="cursor-pointer z-10">
      <Image
        src={isFavorite ? FilledHeart : EmptyHeart}
        alt="Heart Icon"
        width={width}
        height={height}
      />
    </button>
  );
};
