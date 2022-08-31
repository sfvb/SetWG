// Feature Toggle Version
// Toggle: PAUSE GAME BEFORE MARKING SET
// Of File: GameDetails.tsx
import { NextPage } from "next";
import React, { useState } from "react";
import { useLiveQuery, useMutation } from "./generated/nextjs";
import { useEffect } from "react";
import { Scores } from "./Scores";
import { Board } from "./Board";

interface GameDetailProps {
  gameId: string;
}

export const GameDetails: NextPage<GameDetailProps> = ({
  gameId,
}: GameDetailProps) => {
  const { result: gameResult } = useLiveQuery.GetGame({
    input: { id: gameId },
  });
  const { mutate: checkSet } = useMutation.CheckSet();
  const { mutate: pause } = useMutation.PauseGame();
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [paused, setPaused] = useState<boolean>(false);

  const pauseGame = () => {
    setPaused(true);
    pause({ input: { gameId } });
  };

  const keyDownHandler = (e) => {
    console.log(`You pressed ${e.code}.`);
    if (e.code === "Space" && !paused) {
      console.log("afjlsdf");
      pauseGame();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    // clean up
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [paused]);

  useEffect(() => {
    if (cardArray.length === 3) {
      setCardArray([]);
      checkSet({
        input: { setInput: { id: gameId, spots: cardArray } },
      });
    }
  }, [cardArray]);

  const select = (number: number) => {
    const indexInArray = cardArray.indexOf(number);
    if (indexInArray > -1) {
      setCardArray([...cardArray.filter((cardNumber) => cardNumber != number)]);
    } else {
      setCardArray([...cardArray, number]);
    }
  };
  return (
    <div>
      {gameResult.status === "ok" &&
        gameResult.data.db_findFirstgame?.score && (
          <Scores scores={gameResult.data.db_findFirstgame.score} />
        )}
      {gameResult.status === "ok" &&
        gameResult.data.db_findFirstgame?.cardspot && (
          <Board
            cards={gameResult.data.db_findFirstgame.cardspot}
            select={select}
            selected={cardArray}
          />
        )}
    </div>
  );
};
