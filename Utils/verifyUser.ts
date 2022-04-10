import { ALL_OK } from "./constants";
import { NextRouter } from "next/router";

export const verifyUser = async (token: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}user/verify`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const data = await response.json();
  console.log(data);
  if (data.message !== ALL_OK) throw new Error(data);
  return data.data;
};
