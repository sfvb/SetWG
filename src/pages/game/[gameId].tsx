import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { GameDetails } from "../../client/components/GameDetails";
import { GameDetails as GameDetails_FF_pause_game } from "../../client/components/GameDetails-ff-pause_game";
import {
  useWunderGraph,
  withWunderGraph,
} from "../../client/components/generated/nextjs";
import { useFeatureToggle } from "../../client/hooks/useFeatureToggle";
import {
  FeatureArray,
  fetchFeatures,
} from "../../client/services/FeatureToggle";

const GameWrapper = () => {
  const [isEnabled, enableFeature, disableFeature] = useFeatureToggle();
  const router = useRouter();
  const { user } = useWunderGraph();
  const [gameId, setGameId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const processFeatures = useCallback(() => {
    const features = fetchFeatures();
    console.log(features);
    features.forEach(([featureName, isEnabled]: FeatureArray) => {
      console.log(featureName);
      isEnabled ? enableFeature(featureName) : disableFeature(featureName);
    });
  }, [enableFeature, disableFeature]);

  useEffect(() => {
    if (typeof router.query.gameId === "string") setGameId(router.query.gameId);
    if (user && user.name) {
      setUserName(user.name);
    }
    processFeatures();
  }, [router, user]);
  // I do not know how dynamic authorizedRedirectUris work or if it is best practice to use them,
  // so I want to redirect to Home to login.
  // I do not know how to differentiate between the loading state and the invalid user state.
  // In both cases the user is null.
  // So I can not redirect automatically and instead display a redirect message to the user.
  if (!userName || !gameId)
    return (
      <div>
        It does not seem you are logged in, please go to <a href={"/"}>Home</a>{" "}
        to log in.
      </div>
    );

  return (
    <div>
      {isEnabled("pause_game") ? (
        <div>
          <GameDetails_FF_pause_game gameId={gameId} />
        </div>
      ) : (
        <div>
          <GameDetails gameId={gameId} />
        </div>
      )}
    </div>
  );
};

export default withWunderGraph(GameWrapper);
