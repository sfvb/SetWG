import { NextPage } from "next";
import React from "react";
import { GamesList } from "../client/components/gamesList";
import {
  AuthProvider,
  useWunderGraph,
} from "../client/components/generated/nextjs";

//import { withWunderGraph, useLiveQuery, useMutation } from '../components/generated/nextjs';
const Home: NextPage = () => {
  const { user, login } = useWunderGraph();

  const userName = user?.name;

  if (userName) {
    return <GamesList userExternalId={userName} />;
  } else {
    return (
      <div>
        <button
          onClick={() => login(AuthProvider.auth0)}
          className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        >
          Login
        </button>
      </div>
    );
  }
};
export default Home;
