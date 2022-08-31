import { NextPage } from "next";
import React from "react";

interface ScoresProps {
  scores: {
    user: {
      username: string;
    };
    score: number;
  }[];
}

export const Scores: NextPage<ScoresProps> = ({ scores }) => {
  return (
    <div>
      <h1> Current Score:</h1>
      {scores.length > 0 ? (
        scores.map((score) => (
          <div key={score?.user?.username} className="row">
            <div className="column">{score.user.username}</div>
            <div className="column">{score.score}</div>
          </div>
        ))
      ) : (
        <div> Nobody found a set yet.</div>
      )}
    </div>
  );
};
