import {
  AppBar,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import Check from "@mui/icons-material/Check";

const Navbar = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [lensAssociated, setLensAssociated] = useState(true);
  const [lensConnected, setLensConnected] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4">BlockHub</Typography>
        </Box>
        <Stack direction="row" spacing={3}>
          {!walletConnected ? (
            <Button
              color="success"
              variant="contained"
              endIcon={<PowerSettingsNew />}
              onClick={() => setWalletConnected(true)}
            >
              Connect Wallet
            </Button>
          ) : lensConnected ? (
            <Button
              color="success"
              variant="contained"
              endIcon={<PowerSettingsNew />}
            >
              Create Project
            </Button>
          ) : lensAssociated ? (
            <Button
              color="success"
              variant="contained"
              endIcon={<Check />}
              onClick={() => setLensConnected(true)}
            >
              Approve Lens
            </Button>
          ) : (
            <Stack direction="row" alignItems="center" spacing={2}>
              <TextField
                placeholder="Lens Handle"
                size="small"
                sx={{ backgroundColor: "white" }}
              />
              <Button
                color="success"
                variant="contained"
                endIcon={<Check />}
                onClick={() => setLensConnected(true)}
              >
                Create Lens
              </Button>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
