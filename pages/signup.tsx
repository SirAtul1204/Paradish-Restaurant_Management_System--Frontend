import {
  Grid,
  Typography,
  Box,
  Paper,
  Container,
  TextField,
  Fab,
  Link,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FormEvent, useState } from "react";
import { validateEmail } from "../Utils/validation/email";
import { validateName } from "../Utils/validation/name";
import { validatePhone } from "../Utils/validation/phone";
import { validatePassword } from "../Utils/validation/password";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { ALL_OK } from "../Utils/constants";

const Signup = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resName, setResName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) return alert("Passwords doesn't match");
      setIsSpinning(true);

      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}restaurant/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ownerEmail,
            ownerName,
            phoneNumber,
            restaurantName: resName,
            restaurantAddress: address,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.message !== ALL_OK) throw new Error(data.message);
      await router.push("/login");
    } catch (e: any) {
      console.log(e.message);
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
        pb: 5,
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
            Wanna use our app for your restaurant?
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" textAlign="center">
            Just type in your restaurant details to get started today!
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleRegister}>
            <Paper elevation={2} sx={{ p: 2 }}>
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
                    color={validateEmail(ownerEmail) ? "success" : "error"}
                    helperText={
                      validateEmail(ownerEmail) ? "" : "Enter a valid Email ID"
                    }
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                  />
                </Grid>
                <Grid item sx={{ width: 400 }}>
                  <TextField
                    label="Owner's Full Name"
                    variant="filled"
                    fullWidth
                    required
                    type="text"
                    color={validateName(ownerName) ? "success" : "error"}
                    helperText={
                      validateName(ownerName) ? "" : "Enter a valid name"
                    }
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value.trimStart())}
                  />
                </Grid>
                <Grid item sx={{ width: 400 }}>
                  <TextField
                    label="Phone Number"
                    variant="filled"
                    fullWidth
                    required
                    type="number"
                    color={
                      validatePhone(Number(phoneNumber)) ? "success" : "error"
                    }
                    helperText={
                      validatePhone(Number(phoneNumber))
                        ? ""
                        : "Enter a valid phone number"
                    }
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item sx={{ width: 400 }}>
                  <TextField
                    label="Restaurant's Name"
                    variant="filled"
                    fullWidth
                    required
                    type="text"
                    color={validateName(resName) ? "success" : "error"}
                    helperText={
                      validateName(resName) ? "" : "Enter a valid name"
                    }
                    value={resName}
                    onChange={(e) => setResName(e.target.value.trimStart())}
                  />
                </Grid>
                <Grid item sx={{ width: 400 }}>
                  <TextField
                    label="Restaurant's Address"
                    variant="filled"
                    fullWidth
                    required
                    type="text"
                    color={validateName(address) ? "success" : "error"}
                    helperText={
                      validateName(address) ? "" : "Enter a valid address"
                    }
                    value={address}
                    onChange={(e) => setAddress(e.target.value.trimStart())}
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
                <Grid item sx={{ width: 400 }}>
                  <TextField
                    label="Confirm Password"
                    variant="filled"
                    fullWidth
                    required
                    type="password"
                    color={password === confirmPassword ? "success" : "error"}
                    helperText={
                      password === confirmPassword
                        ? ""
                        : "Passwords doesn't match"
                    }
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Fab variant="extended" color={"secondary"} type="submit">
                    Register my restaurant!
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
        <Grid item>
          <Typography>Already have an account?</Typography>
        </Grid>
        <Grid item>
          <Link href="/login" underline="hover" color={"error"}>
            Login
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
