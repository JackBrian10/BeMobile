import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CharacterCardInfo } from "../CharacterCardInfo/CharacterCardInfo";

export const Card = ({
  id,
  name,
  image,
}: {
  id: number;
  name: string;
  image: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/character/${id}`);
  };

  return (
    <div className="flex flex-col h-96 cursor-pointer" onClick={handleClick}>
      <div className="w-full overflow-hidden relative flex-grow">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="bg-red-500 h-1 w-full"></div>
      <CharacterCardInfo {...{ id, name, image }} />
    </div>
  );
};
