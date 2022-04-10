import { grey } from "@mui/material/colors";
import {
  Box,
  Fab,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { validateEmail } from "../Utils/validation/email";
import { validatePassword } from "../Utils/validation/password";
import { FormEvent, useEffect, useState } from "react";
import { ALL_OK } from "../Utils/constants";
import { useCookies } from "react-cookie";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import { verifyUser } from "../Utils/verifyUser";

const Login = () => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  useEffect(() => {
    verifyUser(cookies["token"])
      .then((user) => {
        if (user) router.push("/dashboard").then();
      })
      .catch((e: any) => {
        setIsSpinning(false);
      });
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSpinning(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (data.message !== ALL_OK) throw new Error(data.message);
      setCookie("token", data.data.token, { path: "/" });
      await router.push("/dashboard");
    } catch (e: any) {
      alert(e.message);
      setIsSpinning(false);
    }
  };

  if (isSpinning) return <Loader />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: grey[100],
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4" textAlign="center">
            Login with your credentials
          </Typography>
        </Grid>

        <Grid item>
          <form onSubmit={handleLogin}>
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={1.2}
              >
                <Grid item sx={{ width: 400 }}>
                  <TextField
                    label="Owner's Email ID"
                    variant="filled"
                    required
                    fullWidth
                    type="email"
                    color={validateEmail(email) ? "success" : "error"}
                    helperText={
                      validateEmail(email) ? "" : "Enter a valid Email ID"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item sx={{ width: 400 }}>
                  <TextField
                    label="Password"
                    variant="filled"
                    fullWidth
                    required
                    type="password"
                    color={validatePassword(password) ? "success" : "error"}
                    helperText={
                      validatePassword(password)
                        ? ""
                        : "Password must have 6 characters, at least one letter and one number"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Fab variant="extended" color={"secondary"} type="submit">
                    Log me in!
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
        <Grid item>
          <Typography>Don&apos;t have an account?</Typography>
        </Grid>
        <Grid item>
          <Link href="/signup" underline="hover" color={"error"}>
            Register your restaurant now!
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
