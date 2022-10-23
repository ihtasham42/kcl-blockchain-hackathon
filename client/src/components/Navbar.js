import {
  AppBar,
  Button,
  Card,
  Chip,
  IconButton,
  Modal,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { ethers, Contract } from "ethers";
import { generateChallenge, authenticate } from "./utils/LensProtocol/login";
import { createProfile, getProfile } from "./utils/LensProtocol/profile";
import { uploadToIPFS } from "./utils/ipfs";
import { v4 as uuidv4 } from "uuid";
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  createPostTypedData,
  explorePublications,
} from "./utils/LensProtocol/publication";
import { signedTypeData, splitSignature } from "./utils/LensProtocol/utils";
import { getLensHub } from "./utils/LensProtocol/lens-hub";
import { pollUntilIndexed } from "./utils/LensProtocol/transactions";
const source = "blockerino";
const Navbar = () => {
  const getPublications = async () => {
    const request = {
      sortCriteria: "LATEST",
      publicationTypes: ["POST"],
      sources: [source],
    };
    const publications = await explorePublications(request);
    console.log(publications);
  };
  const postToLens = async (title, description) => {
    const metadata_id = uuidv4();
    const ipfsResult = await uploadToIPFS({
      version: "2.0.0",
      metadata_id,
      locale: "en-us",
      mainContentFocus: "TEXT_ONLY",
      description,
      content: title,
      external_url: null,
      image: null,
      imageMimeType: null,
      name: title,
      attributes: [],
      tags: [],
      media: [],
      appId: "blockerino",
    });
    console.log(ipfsResult);
    const payload = {
      profileId: lensProfileId,
      contentURI:
        "https://" + ipfsResult + ".ipfs.dweb.link/" + metadata_id + ".json",
      collectModule: {
        freeCollectModule: { followerOnly: true },
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };
    console.log("lens profile id", lensProfileId);
    console.log(payload.contentURI);

    const result = await createPostTypedData(payload);
    const typedData = result.data.createPostTypedData.typedData;
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const signature = await signedTypeData(
      signer,
      typedData.domain,
      typedData.types,
      typedData.value
    );
    console.log("create post: signature", signature);

    const { v, r, s } = splitSignature(signature);
    console.log("Signature Split");
    const lensHub = getLensHub(signer);

    const tx = await lensHub.postWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log("here");
    console.log(tx.hash);
    const res = await pollUntilIndexed(tx.hash);
    setLoading(false);
    setOpen(false);
    window.location.reload(false);
    console.log(res);
  };
  useEffect(() => {
    getPublications();
  });
  const [currAcc, setCurrAcc] = useState("");
  const [lensProfileId, setLensProfileId] = useState("");
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
        setCurrAcc(account);
        // alert(account)
        sessionStorage.setItem("address", account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log("Connected", accounts[0]);
      setCurrAcc(accounts[0]);
      sessionStorage.setItem("address", accounts[0]);
      await signInWithLens(accounts[0]);
      const profile = await getProfile(accounts[0]);
      console.log("profile", profile);
      if (profile) {
        setLensProfileId(profile.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setAuthenticationToken = (authenticate) => {
    const { accessToken, refreshToken } = authenticate;
    sessionStorage.setItem("lens-access-token", accessToken);
    sessionStorage.setItem("lens-refresh-token", refreshToken);
  };

  const signInWithLens = async (address) => {
    try {
      const { ethereum } = window;
      const challengeResponse = await generateChallenge(address);
      console.log(challengeResponse);
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
      console.log(err);
    }
  };

  const createLensProfile = async (handle) => {
    try {
      const request = {
        handle,
        profilePictureUri: null,
        followNFTURI: null,
        followModule: null,
      };

      const createProfileResponse = await createProfile(request);
      const profile = await getLensProfile();
      console.log(profile);
    } catch (error) {
      console.log("error in create profile", error);
    }
  };

  const getLensProfile = async () => {
    const profile = await getProfile(currAcc);
    console.log(profile);
    return profile;
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AppBar position="static">
      <Modal open={open} sx={style}>
        <Card sx={{ padding: 5 }}>
          <Stack spacing={3}>
            <Typography variant="h4" textAlign={"center"}>
              Add your Project to BlockHub
            </Typography>
            <TextField
              name="title"
              fullWidth
              placeholder="Title"
              onChange={handleChange}
            />
            <TextField
              name="description"
              fullWidth
              placeholder="Description"
              onChange={handleChange}
            />
            <TextField
              name="github"
              fullWidth
              placeholder="GitHub URL"
              onChange={handleChange}
            />

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                disabled={loading}
                onClick={() => {
                  postToLens(formData.title, formData.description);
                  setLoading(true);
                }}
              >
                {!loading ? <span>Submit</span> : <span>Submitting</span>}
              </Button>
              <Button
                fullWidth
                onClick={() => {
                  setFormData({});
                  setOpen(false);
                }}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Modal>
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4">BlockHub</Typography>
        </Box>
        <Stack direction="row" spacing={3}>
          <Button color="inherit" component={RouterLink} to="/leaderboard">
            Leaderboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/">
            Curate
          </Button>
          {currAcc == "" ? (
            <Button
              onClick={connectWallet}
              color="success"
              variant="contained"
              endIcon={<PowerSettingsNew />}
            >
              Connect Wallet
            </Button>
          ) : null}
          {currAcc !== "" && lensProfileId == "" ? (
            <Button
              onClick={() => createLensProfile("kcl-easya")}
              color="success"
              variant="contained"
            >
              Create Profile
            </Button>
          ) : null}
          {lensProfileId !== "" ? (
            <Stack alignItems="center" spacing={2} direction="row">
              <Typography variant="h5">840 Blockos</Typography>
              <IconButton>
                <AccountCircleIcon
                  sx={{ color: "white", width: 30, height: 30 }}
                />
              </IconButton>

              <Button
                color="success"
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add Project
              </Button>
            </Stack>
          ) : null}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
