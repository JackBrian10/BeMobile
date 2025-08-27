"use client";
import { useMemo } from "react";
import { useFetch } from "@/app/hooks/useFetch";
import { notFound, useParams } from "next/navigation";
import md5 from "md5";
import Image from "next/image";
import { CharacterBanner } from "@/app/components/CharacterBanner/CharacterBanner";

interface MarvelResponse<T> {
  data: {
    results: T[];
  };
}

export interface CharacterResult {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface ComicResult {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  dates?: { type: string; date: string }[];
}

export default function CharacterDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const ts = useMemo(() => Date.now().toString(), []);
  const hash = useMemo(
    () =>
      md5(
        ts +
          process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY +
          process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
      ),
    [ts]
  );

  const characterUrl = useMemo(
    () =>
      `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}&ts=${ts}&hash=${hash}`,
    [id, ts, hash]
  );

  const comicsUrl = useMemo(
    () =>
      `https://gateway.marvel.com/v1/public/characters/${id}/comics?apikey=${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}&ts=${ts}&hash=${hash}`,
    [id, ts, hash]
  );

  const {
    data: characterData,
    loading: loadingCharacter,
    error: errorCharacter,
  } = useFetch<MarvelResponse<CharacterResult>>(characterUrl);

  const {
    data: comicsData,
    loading: loadingComics,
    error: errorComics,
  } = useFetch<MarvelResponse<ComicResult>>(comicsUrl);

  if (loadingCharacter || loadingComics) return <p>Cargando...</p>;
  if (errorCharacter || errorComics)
    return <p className="text-red-600">❌ Error al cargar datos</p>;

  const item = characterData?.data?.results?.[0];
  if (!item) return notFound();

  const character = {
    id: item.id,
    name: item.name,
    description: item.description,
    image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
  };

  const comics =
    comicsData?.data?.results?.map((comic) => ({
      id: comic.id,
      title: comic.title,
      image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      date: comic.dates?.find((d) => d.type === "onsaleDate")?.date,
    })) || [];

  return (
    <div className="flex flex-col items-center">
      <CharacterBanner character={character} />
      <div className="flex flex-col w-full p-12 gap-6">
        <div className="self-start text-3xl">COMICS</div>

        <div className="flex gap-4 overflow-x-auto py-4">
          {comics.map((comic) => (
            <div
              key={comic.id}
              className="flex-shrink-0 flex flex-col items-center w-[180px]"
            >
              <Image
                src={comic.image}
                alt={comic.title}
                width={800}
                height={400}
                className="object-cover rounded-lg mb-2"
              />
              <h1 className="text-lg font-bold mb-1 text-center">
                {comic.title}
              </h1>
              {comic.date && (
                <p className="text-gray-500 text-sm">
                  {new Date(comic.date).getFullYear()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
