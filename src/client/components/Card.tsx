import { NextPage } from "next";
import React, { useState } from "react";

interface CardDetailProps {
  card: { id: string; color: string; shape: string; amount: string };
  number: number;
  select: (number) => void;
  selected: number[];
}

export const Card: NextPage<CardDetailProps> = ({
  card,
  number,
  select,
  selected,
}) => {
  const [cardSelected, setCardSelected] = useState(false);
  if (selected.indexOf(number) > -1 && !cardSelected) {
    setCardSelected(true);
  } else if (selected.indexOf(number) === -1 && cardSelected) {
    setCardSelected(false);
  }

  const selectThisCard = () => {
    select(number);
  };

  return (
    <div>
      <div
        className={"card" + (cardSelected ? " selected" : " notselected")}
        onClick={selectThisCard}
      >
        <div key={card.color + card.shape + card.amount}>
          {[...Array(parseInt(card.amount, 10)).keys()].map((key) => (
            <div className="symbol" key={key}>
              <div className={card.color + card.shape}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
