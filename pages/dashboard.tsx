import { useEffect, useState } from "react";
import { verifyUser } from "../Utils/verifyUser";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

import Nav from "../components/Nav";
import { Grid, Box, ThemeProvider } from "@mui/material";
import theme from "../Utils/MaterialTheme";

export type TRole = "OWNER" | "WAITER";

export interface IUser {
  id: string;
  name: string;
  role: TRole;
}

const Dashboard = () => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  useEffect(() => {
    verifyUser(cookies["token"])
      .then((user) => {
        setUser(user);
        setIsSpinning(false);
      })
      .catch(async (e) => {
        await router.push("/login");
      });
  }, []);

  if (isSpinning) return <Loader />;

  if (user)
    return (
      <ThemeProvider theme={theme}>
        <Nav role={user.role} />
        <Box>
          Dashboard
          {user && user.id}
        </Box>
      </ThemeProvider>
    );
};

export default Dashboard;
