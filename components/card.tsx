import { NextPage } from "next";
import React, { useEffect, useState } from "react";

export const Card: NextPage = ({ card, number, select, selected }) => {

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
      <div className={"card" + (cardSelected ? " selected" : " notselected")} onClick={selectThisCard}>
        <div>
          {[...Array(parseInt(card.amount, 10)).keys()].map(() => (
            <div className="symbol">
              <div
                className={
                  card.color +
                  card.shape
                }
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/*<div key={card?.card.id}>
                <div className={card?.card.color + card?.card.shape}></div>
                {card?.card.amount} -- {card?.card.shape} -- {card?.card.color}
                Hallo
                {JSON.stringify(card)}
              </div>
              */
