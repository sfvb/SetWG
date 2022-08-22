import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useMutation } from "./generated/nextjs";

export const NewUser: NextPage = ({ userExternalId, refetch}) => {
  const { result, mutate } = useMutation.CreateUser();
  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate({
      input: {
        externalId: userExternalId,
        username: event.target.name.value,
      },
    });
    window.location.reload();
  };
  return (
    <div>
      <div>
        <h1>Hi {userExternalId},</h1>
        <p> under what name do you want to be known here?</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="last">Your nickname:</label>
        <input type="text" id="name" name="name" />
        <br />
        <button type="submit">Set your nickname</button>
      </form>
    </div>
  );
};
