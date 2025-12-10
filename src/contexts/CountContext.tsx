import React, { createContext, useContext, useState } from "react";

interface CountContextType {
  counts: Record<number, number>;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clearSelected: (id: number) => void;
  resetCounts: () => void; // تابع ریست اضافه شد
}

const CountContext = createContext<CountContextType | undefined>(undefined);

export const CountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [counts, setCounts] = useState<Record<number, number>>({});

  function clearSelected(id: number) {
    setCounts((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

  function increase(id: number) {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  function decrease(id: number) {
    setCounts((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
  }

  function resetCounts() {
    setCounts({});
  }

  return (
    <CountContext.Provider
      value={{ counts, increase, decrease, clearSelected, resetCounts }}
    >
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) throw new Error("useCount must be used within CountProvider");
  return context;
};
