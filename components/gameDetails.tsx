import { NextPage } from "next";
import React, { useState } from "react";
import { cachedDataVersionTag } from "v8";
import { useLiveQuery, useMutation, useQuery } from "./generated/nextjs";
import { Card } from "./card";

export const GameDetails: NextPage = ({ gameId }) => {
  const { result } = useLiveQuery.GetGame({ input: { id: gameId } });
  const checkSetMutation = useMutation.CheckSet();
  const [cardArray, setCardArray] = useState([]);
  if (cardArray.length === 3) {
    setCardArray([]);
    checkSetMutation.mutate({ input: { setInput: { id: gameId, spots: cardArray } } });
  }
  //let cardArray = [];
  const select = (number) => {
    const indexInArray = cardArray.indexOf(number);
    if (indexInArray > -1) {
      setCardArray([...cardArray.filter((cardNumber) => cardNumber != number)]);
    } else {
      setCardArray([...cardArray, number]);
    }
  };
  const pauseMutation = useMutation.PauseGame();
  let paused = false;
  if (typeof window !== "undefined") {
    document.addEventListener("keydown", function (event) {
      if ((event.keyCode === 32)&&!paused) {
        paused = true;
        pauseMutation.mutate({ input: { gameId } });
      }
    });
  }
  return (
    <div>
      <div>
        <h1> Current Score:</h1>
        {result?.data?.db_findFirstgame?.score?.map((score) => (
          <div key={score?.user?.username} className="row">
            <div className="column">{score.user.username}</div>
            <div className="column">{score.score}</div>
          </div>
        ))}
      </div>
      <div>
        {result.status === "ok" && (
          <div className="board">
            {result.data.db_findFirstgame?.cardspot
              ?.sort(compare)
              .map((card) => (
                <div>
                  <Card
                    card={card.card}
                    number={card.card_number}
                    select={select}
                    selected={cardArray}
                  ></Card>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

function compare(a, b) {
  if (a.card_number < b.card_number) {
    return -1;
  }
  return 1;
}
