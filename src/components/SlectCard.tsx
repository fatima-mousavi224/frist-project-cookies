import { useCount } from "../contexts/CountContext";

export default function SelectCard({ id }: { id: number }) {
  const { counts, increase, decrease } = useCount();
  const count = counts[id] || 0;

  return (
    <div className="absolute bottom-21 left-8 right-8 flex justify-center">

      {count === 0 && (
        <button
          onClick={() => increase(id)}
          className="w-full bg-white border border-[#260f08] rounded-full 
                     py-2 flex items-center justify-center gap-2 text-sm font-semibold
                     hover:border-[#c73a0f] hover:text-[#c73a0f] transition-all"
        >
          <img src="src/assets/images/icon-add-to-cart.svg" className="w-4" />
          Add to Cart
        </button>
      )}

      {count > 0 && (
        <div
          className="w-full bg-[#c73a0f] text-white rounded-full 
                     py-2 flex items-center justify-between px-5 font-semibold"
        >
          <img
            className="border-[1.5px] border-white py-2 px-1 rounded-full"
            onClick={() => decrease(id)}
            src="src/assets/images/icon-decrement-quantity.svg"
            alt="decrement"
          />

          <span className="text-sm">{count}</span>

          <img
            className="border-[1.5px] border-white py-1 px-1 rounded-full"
            onClick={() => increase(id)}
            src="src/assets/images/icon-increment-quantity.svg"
            alt="increment icon"
          />
        </div>
      )}
    </div>
  );
}
