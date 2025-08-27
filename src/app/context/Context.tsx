"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface CharacterItem {
  id: number;
  name: string;
  image: string;
}

interface ContextType {
  favorites: CharacterItem[];
  addFavorite: (character: CharacterItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<CharacterItem[]>([]);

  const addFavorite = (character: CharacterItem) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.id === character.id)) return prev;
      return [...prev, character];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((f) => f.id === id);
  };

  return (
    <Context.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApp = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useContextApp debe usarse dentro de ContextProvider");
  return context;
};
