import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { ethers, Contract } from 'ethers';

const Navbar = () => {
  const [currAcc, setCurrAcc] = useState("");
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrAcc(account)
        alert(account)
        sessionStorage.setItem('address', account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      // console.log("Connected", accounts[0]);
      alert(accounts[0])
      setCurrAcc(accounts[0])
      sessionStorage.setItem('address', accounts[0])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('helloo')
  })
  return (
    <AppBar position="static">
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4">BlockHub</Typography>
        </Box>
        <Stack direction="row" spacing={3}>
          {currAcc !== "" ? <Button
            onClick={connectWallet}
            color="success"
            variant="contained"
            endIcon={<PowerSettingsNew />}
          >
            Connect Wallet
          </Button> : `${currAcc}`}

        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
