import { useRouter } from "next/router";
import React from "react";
import { GameDetails } from "../../components/gameDetails";
import {
  AuthProvider,
  useWunderGraph,
  withWunderGraph,
} from "../../components/generated/nextjs";
import { NextResponse } from "next/server";

const GameWrapper = () => {
  const router = useRouter();
  const { gameId } = router.query;
  const { user, login, logout } = useWunderGraph();
  const userName = user?.name;
  if (userName) {
    return (
      <div>
        <GameDetails gameId={gameId} />
      </div>
    );
  } else {
    return <div>You are not logged in</div>;
  }
};

export default withWunderGraph(GameWrapper);
