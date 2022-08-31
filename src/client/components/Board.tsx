import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card } from "./Card";

interface card {
  card_number: number;
  card?:
    | {
        id: string;
        amount: string;
        color: string;
        shape: string;
      }
    | undefined;
}

interface BoardProps {
  cards: card[];
  select: (number) => void;
  selected: number[];
}

export const Board: NextPage<BoardProps> = ({ cards, select, selected }) => {
  const [sortedCards, setSortedCards] = useState<card[]>([]);

  useEffect(() => {
    setSortedCards(cards.sort(compare).filter(isDefined));
  }, [cards]);

  return (
    <div className="board">
      {sortedCards.map((card) => (
        <div key={card.card_number}>
          <Card
            card={card.card!}
            number={card.card_number}
            select={select}
            selected={selected}
          ></Card>
        </div>
      ))}
    </div>
  );
};

function compare(a, b) {
  if (a.card_number < b.card_number) {
    return -1;
  }
  return 1;
}

// TODO:
// This function is necessary, because there might be a spot in the game where there is no card present.
// The reason for this is, thatt I currently do not differentiate between cards and spots in the frontend.
// This should be refactored and this function removed.
function isDefined(a) {
  return typeof a !== "undefined";
}
