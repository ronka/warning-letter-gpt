"use client";
import React, { createContext, useContext, useState } from "react";

type Data = { content: string; id: string };

interface LetterContext {
  letter: Data | null;
  setLetter: (letter: Data) => void;
}
const LetterContext = createContext<LetterContext>({
  letter: null,
  setLetter: () => {},
});

export const LetterProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [letter, setLetter] = useState<Data | null>(null);

  return (
    <LetterContext.Provider value={{ letter, setLetter }}>
      {children}
    </LetterContext.Provider>
  );
};

export const useLetter = () => {
  const context = useContext(LetterContext);
  if (!context) {
    throw new Error("useLetter must be used within a LetterProvider");
  }
  return context;
};
