"use client";
import Image from "next/image";
import MarvelLogo from "../../../../public/marvel-logo.svg";
import Link from "next/link";
import Favourites from "../../../../public/FilledHeart.svg";
import { useContextApp } from "../../context/Context";

export const Header = () => {
  const { favorites } = useContextApp();

  return (
    <div className="bg-black h-21 flex justify-between items-center pt-4 pl-12 pr-12 pb-4">
      <Link href="/">
        <Image src={MarvelLogo} alt="Marvel Logo" />
      </Link>
      <Link href="/favorites" className="flex flex-row items-center gap-2 ">
        <Image src={Favourites} alt="Favourites" />
        <span className="text-white">{favorites.length}</span>
      </Link>
    </div>
  );
};
