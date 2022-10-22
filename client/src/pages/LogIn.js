import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const LogIn = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      ></Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};

export default LogIn;
