// import React from "react";
import EmtyCard from "./EmtyCard";
import { useCount } from "../contexts/CountContext";
import FullCard from "./FullCard";

export default function SecondCard() {
  const { counts } = useCount();

  
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="bg-white lg:w-sm md:w-74 w-68 mt-8  h-min lg:p-6 p-4 rounded-2xl shadow-xs">
        <h1 className="text-[#c73a0f] text-2xl font-bold">
          Your Cart ( <span>{totalCount}</span> )
        </h1>
        {
          totalCount === 0 ?  <EmtyCard /> : <FullCard />
        }
       
      </div>
    </div>
  );
}
