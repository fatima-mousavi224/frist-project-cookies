import { useCount } from "../contexts/CountContext";
import { useSweet } from "../contexts/Sweets";

interface OrderModalProps {
  close: () => void;
}

export default function OrderModal({ close }: OrderModalProps) {
  const { cards } = useSweet();
  const { counts, resetCounts } = useCount(); 

  const selectedCards = cards.filter((card) => (counts[card.id] || 0) > 0);

  const total = selectedCards.reduce(
    (sum, c) => sum + c.price * counts[c.id],
    0
  );

  const handleStartNewOrder = () => {
    resetCounts(); 
    close();       
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white lg:p-6 md:p-6 px-4 py-6 rounded-xl lg:w-md md:w-sm">
        <img
          className="lg:w-8 w-6 md:w-7"
          src="src/assets/images/icon-order-confirmed.svg"
          alt="confirm photo"
        />
        <h2 className="lg:text-3xl md:text-3xl text-2xl text-[#260f08] font-bold pt-4">
          Order Confirmed
        </h2>
        <p className="text-[#ad8985] lg:text-base md:text-sm text-xs mb-6 mt-2">
          We hope you enjoy your food!
        </p>

        <div className="bg-[#fcf9f7] p-4 rounded-lg shadow-xs">
          {selectedCards.map((card) => (
            <div
              key={card.id}
              className="flex justify-between items-center border-b border-[#f4edeb]"
            >
              <div className="flex gap-2 justify-center items-center py-3">
                <img className="w-10 h-10 rounded-sm" src={card.image} alt="sweet imag" />
                <div>
                  <p className="text-sm lg:text-base md:text:base font-medium text-[#452e28]">{card.fullName}</p>
                  <p className="pt-1 lg:text-base text-sm font-bold text-[#c73a0f]">
                    {counts[card.id]}x
                    <span className="ml-2 lg:text-sm text-xs font-medium text-[#c9aea6]">@ ${card.price.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <p className="font-medium lg:text-base text-sm text-[#260f08]">
                ${(card.price * counts[card.id]).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <span className="text-[#35170e] lg:text-base text-xs font-medium">Order Total</span>
            <span className="font-bold lg:text-2xl text-base text-[#260f08]">${total.toFixed(2)}</span>
          </div>
        </div>

        <div 
          onClick={handleStartNewOrder} 
          className="bg-[#c73a0f] hover:bg-[#8a2405] text-white font-normal mt-6 lg:py-3 py-2 text-xs md:text-sm lg:text-base md:py-2.5 text-center rounded-3xl"
        >
          <button>Start New Order</button>
        </div>
      </div>
    </div>
  );
}
