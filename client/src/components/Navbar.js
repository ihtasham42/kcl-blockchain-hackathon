import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4">BlockHub</Typography>
        </Box>
        <Stack direction="row" spacing={3}>
          <Button
            color="success"
            variant="contained"
            endIcon={<PowerSettingsNew />}
          >
            Connect Wallet
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
