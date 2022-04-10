import {
  Box,
  Fab,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "../Utils/MaterialTheme";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { IUser } from "./dashboard";
import Loader from "../components/Loader";
import { verifyUser } from "../Utils/verifyUser";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const AddEmployees = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [role, setRole] = useState("");

  const router = useRouter();

  useEffect(() => {
    verifyUser(cookies["token"])
      .then((user) => setUser(user))
      .catch(async (e: any) => await router.push("/login"));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phoneNumber || !role)
      return alert("Please fill all the required details");
  };

  if (!user) return <Loader />;

  return (
    <ThemeProvider theme={theme}>
      <Nav role={user.role} />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h6">Add Employee Details</Typography>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item sx={{ width: 400 }}>
                    <TextField
                      variant="filled"
                      fullWidth
                      label="Full Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={{ width: 400 }}>
                    <TextField
                      variant="filled"
                      fullWidth
                      label="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={{ width: 400 }}>
                    <TextField
                      variant="filled"
                      fullWidth
                      label="Phone Number"
                      type="number"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item sx={{ width: 400 }}>
                    <InputLabel id="role-select-label" sx={{ ml: 1.7 }}>
                      Role
                    </InputLabel>
                    <Select
                      labelId="role-select-label"
                      label="Role"
                      fullWidth
                      variant="filled"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value="OWNER">Owner</MenuItem>
                      <MenuItem value="WAITER">Waiter</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item>
                    <Fab
                      variant={"extended"}
                      color={"secondary"}
                      sx={{ px: 5 }}
                      type={"submit"}
                    >
                      Add
                    </Fab>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default AddEmployees;
