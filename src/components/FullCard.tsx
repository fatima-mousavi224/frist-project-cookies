import { useState } from "react";
import { useSweet } from "../contexts/Sweets";
import { useCount } from "../contexts/CountContext";
import Spinner from "./Spinner";
// import { useNavigate } from "react-router-dom";
import OrderModal from "./OrderModal";

// import { count } from "console";

export default function FullCard() {
  const { cards, error, isLoading } = useSweet();
  const { counts, clearSelected } = useCount();
  const [isOpen, setIsOpen] = useState(false);


  if (isLoading) return <Spinner />;
  if (error) return <p>{error}</p>;

  const selectedCards = cards.filter((card) => (counts[card.id] || 0) > 0);

  const totallPrice = selectedCards.reduce((total, card) => {
    return total + card.price * counts[card.id]
  }, 0);

  function handleConfirm() {
  setIsOpen(true);
}



  return (
    <div className="mt-8 ">
      {selectedCards.map((card) => (
        <div className="flex justify-between items-center mb-4 border-b border-[#f4edeb] pb-3">
          <div key={card.id} className="">
            <h3 className="lg:text-lg text-sm text-[#260f08] font-medium">
              {card.fullName}
            </h3>
            {/* flex */}
            <div className="flex gap-3 items-center pt-2">
              <p className="text-[#c73a0f] text-base font-medium">
                <span>{counts[card.id]}</span>x
              </p>

              <p className="text-[#ad8985] lg:text-xs text-[10px] font-medium">
                @ <span>${card.price.toFixed(2)}</span>
              </p>

              <p className="text-[#87635a] font-medium lg:text-sm text-[10px]">
                ${(card.price * counts[card.id]).toFixed(2)}
              </p>
            </div>
          </div>
          <img
            className="border-[1.5px] border-[#c9aea6] w-4 lg:p-1 p-0.5 rounded-full hover:border-[#87635a]"
            src="src/assets/images/icon-remove-item.svg"
            alt="remove icon"
            onClick={() => clearSelected(card.id)}
          />
        </div>
      ))}

      <div className="flex justify-between pt-3">
      <h2 className="text-[#35170e] text-sm lg:text-base">Order Total</h2>
      <p className="text-[#260f08] lg:text-2xl text-xl font-bold">${totallPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-center gap-2 p-2 bg-[#fcf9f7] my-4 rounded-lg py-3 shadow-sm">
        <img className="lg:w-6 w-4" src="src/assets/images/icon-carbon-neutral.svg" alt="carboon imag"/>
        <p className="text-[#87635a] lg:text-sm text-xs font-medium">This is a <span className="font-normal text-[#260f08]">carbon-nutral</span> delivery</p>
      </div>
      <div onClick={handleConfirm} className="bg-[#c73a0f] hover:bg-[#8a2405] text-white font-normal mt-6 lg:py-3 md:py-2.5 py-2 text-xs md:text-sm lg:text-base text-center rounded-3xl">
        <button>Confirm Order</button>
      </div>
      {isOpen && <OrderModal close={() => setIsOpen(false)} />}

    </div>
  );
}
