import { QueryArgsWithInput } from "@wundergraph/nextjs";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { GetUserInput } from "./generated/models";
import { useMutation } from "./generated/nextjs";

interface NewUserProps {
  userExternalId: string;
  refetch: () => void;
}

export const NewUser: NextPage<NewUserProps> = ({
  userExternalId,
  refetch,
}) => {
  const { mutate: createUser, result } = useMutation.CreateUser();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (result.status === "ok") {
      refetch();
    }
  }, [result]);

  const handleSubmit = (event) => {
    if (username) {
      createUser({
        input: {
          externalId: userExternalId,
          username: username,
        },
      });
    }
  };

  return (
    <div>
      <div>
        <h1>Hi {userExternalId},</h1>
        <p> under what name do you want to be known here?</p>
      </div>
      <div>
        <label htmlFor="last">Your nickname:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>Set your nickname</button>
      </div>
    </div>
  );
};
