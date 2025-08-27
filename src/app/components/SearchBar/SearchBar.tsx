import Image from "next/image";
import SearchIcon from "../../../../public/search-icon.svg";
import { ChangeEvent } from "react";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  resultsCount: number;
};

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  resultsCount,
}: SearchBarProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex w-full flex-col px-12 py-3 gap-3">
      <div className="border-b-1 border-black pb-2 gap-2 flex items-center w-full">
        <Image src={SearchIcon} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search for a character..."
          className="w-full border-none outline-none"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <p>{resultsCount} resultados</p>
    </div>
  );
};
