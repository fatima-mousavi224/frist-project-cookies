// import React from "react";
import { useSweet } from "../contexts/Sweets";
import Spinner from "./Spinner";
import SelectCard from "./SlectCard";
import { useCount } from "../contexts/CountContext";

export default function Cards() {
  const { cards, error, isLoading } = useSweet();
  const { counts } = useCount(); 

  if (isLoading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-[#260f08] font-bold text-4xl p-2">Desserts</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 lg:gap-4">
      {cards.map(card => {
        const count = counts[card.id] || 0; 

        return (
          <div key={card.id} className="relative mt-3">
            
            <img
              src={card.image}
              alt={card.name}
              className={
                count > 0
                  ? "lg:w-52 md:w-48 w-68 md:h-40 lg:h-48 h-50 rounded-lg border-2 border-[#c73a0f]" 
                  : "lg:w-52 md:w-48 w-68 md:h-40 lg:h-48 h-50 rounded-lg"
              }
            />

            <SelectCard id={card.id} />

            <h2 className="pt-8 text-sm text-[#87635a]">{card.name}</h2>
            <p className="font-medium text-[#260f08]">{card.fullName}</p>
            <p className="text-[#c73a0f] text-base font-medium">
              ${card.price.toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
    </div>
  );
}
