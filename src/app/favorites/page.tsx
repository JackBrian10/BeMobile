"use client";
import { useState } from "react";
import { useContextApp } from "../context/Context";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Card } from "../components/Card/Card";

export default function FavouritesPage() {
  const { favorites } = useContextApp();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFavorites = favorites.filter((fav) =>
    fav.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center pt-12 pb-12 px-4">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultsCount={filteredFavorites.length}
      />
      {filteredFavorites.length === 0 ? (
        <p>No hay favoritos</p>
      ) : (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,300px)] w-full px-12">
          {filteredFavorites.map((character) => (
            <Card key={character.id} {...character} />
          ))}
        </div>
      )}
    </div>
  );
}
