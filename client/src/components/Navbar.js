import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4">BlockHub</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">Curate</Button>
          <Button color="inherit">Add Project</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
