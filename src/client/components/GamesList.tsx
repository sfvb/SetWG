import { NextPage } from "next";
import React, { useState } from "react";
import { useLiveQuery, useMutation, useQuery } from "./generated/nextjs";
import { NewUser } from "./NewUser";

interface GamesListProps {
  userExternalId: string;
}

export const GamesList: NextPage<GamesListProps> = ({ userExternalId }) => {
  const [name, setName] = useState<string>("");
  const { mutate: createGame } = useMutation.CreateGame();
  const query = useLiveQuery.GetGames();
  const { result: userResult, refetch } = useQuery.GetUser({
    input: { externalId: userExternalId },
  });
  if (userResult.status !== "ok") return <></>;
  if (!userResult.data.db_findFirstuser) {
    return (
      <NewUser
        userExternalId={userExternalId}
        refetch={() =>
          refetch({
            input: { externalId: userExternalId },
          })
        }
      />
    );
  }
  return (
    <div>
      {query.result.status === "ok" &&
        query.result.data.db_findManygame.length > 0 && (
          <h2>Select an existing game:</h2>
        )}
      {query.result.status === "ok" &&
        query.result.data.db_findManygame.map((game) => (
          <div key={game.id}>
            <a href={"/game/" + game.id}>{game.name}</a>
          </div>
        ))}
      <h2>Create a new Game</h2>
      <h3>Game Name:</h3>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => createGame({ input: { name } })}>Create</button>
    </div>
  );
};
