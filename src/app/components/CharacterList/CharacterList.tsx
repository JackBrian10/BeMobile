"use client";
import { useState, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Card } from "../Card/Card";
import { SearchBar } from "../SearchBar/SearchBar";
import md5 from "md5";
import { CardType } from "../../types/Card";
interface MarvelApiResponse {
  data: {
    results: Array<{
      id: number;
      name: string;
      thumbnail: {
        path: string;
        extension: string;
      };
    }>;
  };
}
export const CharacterList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = useMemo(() => {
    const ts = Date.now().toString();
    const hash = md5(
      ts +
        process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY +
        process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
    );
    return `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}&ts=${ts}&hash=${hash}&limit=50`;
  }, []);

  const { data, loading, error } = useFetch<MarvelApiResponse>(apiUrl);
  if (loading) return <p>Cargando personajes...</p>;
  if (error) return <p className="text-red-600"> Error: {error.message}</p>;

  const cards: CardType[] =
    data?.data?.results?.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.thumbnail?.path + "." + item.thumbnail?.extension,
    })) || [];

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center pt-12 pb-12">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultsCount={filteredCards.length}
      />
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,300px)] w-full px-12">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            image={card.image}
            id={card.id}
          />
        ))}
      </div>
      {/* <div className="grid gap-6 w-full px-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            image={card.image}
            id={card.id}
          />
        ))}
      </div> */}
    </div>
  );
};
