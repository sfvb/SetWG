import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  useLiveQuery,
  useMutation,
  useQuery,
} from "./generated/nextjs";
import { NewUser } from "./newUser";

export const GamesList: NextPage = ({ userExternalId, logout }) => {
  const { result, mutate } = useMutation.CreateGame();
  const query = useLiveQuery.GetGames();
  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate({
      input: {
        name: event.target.name.value,
      },
    });
  };
  const userquery = useQuery.GetUser({ input: { externalId: userExternalId } });

  if (!userquery?.result?.data?.db_findFirstuser) {
  return <NewUser userExternalId={userExternalId} refetch={userquery.refetch} />;
  }
  return (
    <div>
      <button
        onClick={() => logout()}
        className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
      >
        Logout
      </button>
      <h1>The ultimate Massive Multiplate Online Set Game:</h1>
      <h2>Select an existing game:</h2>
      {query.result?.data?.db_findManygame?.map((game) => (
        <div key={game.id}>
          <a href={"/game/" + game.id}>{game.name}</a>
        </div>
      ))}
      <h2>Create a new Game</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="last">Game Name:</label>
        <input type="text" id="name" name="name" />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

