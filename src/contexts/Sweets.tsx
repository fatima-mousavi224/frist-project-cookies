import { createContext, useContext, useEffect, useState } from "react";

export interface SweetCard {
  id: number;
  name: string;
  fullName: string;
  price: number;
  image?: string;
}

export interface SweetContextType {
  cards: SweetCard[];
  isLoading: boolean;
  error: string;
}

const SweetContext = createContext<SweetContextType | null>(null);

export function SweetProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<SweetCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "/data/cookies.json";

  useEffect(() => {
    async function FetchCard() {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("threr are Error to find data");
        const data = await res.json();
        setCards(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    FetchCard();
  }, []);

  return (
    <SweetContext.Provider
      value={{
        isLoading,
        error,
        cards,
      }}
    >
      {children}
    </SweetContext.Provider>
  );
}

export function useSweet() {
    const context = useContext(SweetContext)
    if(!context ) throw new Error("useSweet must use inside SweetContext");
    return(context)
}