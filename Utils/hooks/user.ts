import useSWR from "swr";
import { useCookies } from "react-cookie";
import { ALL_OK } from "../constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { route } from "next/dist/server/router";

export type TRole = "OWNER" | "WAITER";

export interface IUser {
  id: string;
  name: string;
  role: TRole;
}

export function useAuthSession() {
  // const [user, setUser] = useState<IUser | null>(null);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}user/verify`;

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  const verifyUser = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: cookies["token"],
      },
    });

    const data = await response.json();
    console.log(data);
    if (data.message !== ALL_OK) throw new Error(data);
    return data.data;
  };

  const { data: user, error } = useSWR(url, verifyUser, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 401) return;

      // Only retry up to 10 times.
      if (retryCount >= 3) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 1000);
    },
  });

  useEffect(() => {
    if (!user) router.push("/login").then();
  }, [user]);

  return user;
}
