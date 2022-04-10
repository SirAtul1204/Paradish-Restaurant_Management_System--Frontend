import { Button, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item>
        <Typography>Hello World</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained">Pop</Button>
      </Grid>
    </Grid>
  );
};

export default Home;
