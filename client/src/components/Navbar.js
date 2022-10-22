import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { ethers, Contract } from 'ethers';
import { generateChallenge, authenticate } from "./utils/LensProtocol/login";
import { createProfile, getProfile } from "./utils/LensProtocol/profile";


const Navbar = () => {
  const [currAcc, setCurrAcc] = useState("");
  const [lensProfileId, setLensProfileId] = useState("")
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
        // alert(account)
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
      setCurrAcc(accounts[0])
      sessionStorage.setItem('address', accounts[0])
      await signInWithLens(accounts[0])
      const profile = await getProfile(accounts[0])
      console.log('profile', profile)
      if (profile) {
        setLensProfileId(profile.id)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const setAuthenticationToken = (authenticate) => {
    const { accessToken, refreshToken } = authenticate;
    sessionStorage.setItem("lens-access-token", accessToken);
    sessionStorage.setItem("lens-refresh-token", refreshToken);
  };

  const signInWithLens = async (address) => {
    try {
      const { ethereum } = window
      const challengeResponse = await generateChallenge(address)
      console.log(challengeResponse)
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(
        challengeResponse.data.challenge.text
      );
      console.log("--isSignstring", signature);
      const accessTokens = await authenticate(address, signature);
      console.dir(accessTokens, { depth: null });
      setAuthenticationToken(accessTokens.data.authenticate);
    } catch (err) {
      console.log(err)
    }

  }

  const createLensProfile = async (handle) => {
    try {

      const request = {
        handle,
        profilePictureUri: null,
        followNFTURI: null,
        followModule: null
      }

      const createProfileResponse = await createProfile(request)
      const profile = await getLensProfile();
      console.log(profile)
    } catch (error) {
      console.log('error in create profile', error)
    }
  }

  const getLensProfile = async () => {
    const profile = await getProfile(currAcc)
    console.log(profile)
    return profile
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4">BlockHub</Typography>
        </Box>
        <Stack direction="row" spacing={3}>
          {currAcc == "" ? <Button
            onClick={connectWallet}
            color="success"
            variant="contained"
            endIcon={<PowerSettingsNew />}
          >
            Connect Wallet
          </Button> : null}
          {currAcc !== "" && lensProfileId == "" ?
            <Button
              onClick={() => createLensProfile('kcl-easya')}
              color="success"
              variant="contained">Create Profile</Button> : null}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
