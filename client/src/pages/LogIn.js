import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container, flexbox } from "@mui/system";
import React from "react";
import Check from "@mui/icons-material/Check";
import ViewStream from "@mui/icons-material/ViewStream";

const LogIn = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f2f7fa",
        }}
      >
        <Stack sx={{ width: 400 }}>
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <ViewStream color="primary" sx={{ fontSize: 75 }} />
            <Typography variant="h2">BlockHub</Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />
          <List>
            <ListItem sx={{ display: "flex", alignItems: "flex-start" }}>
              <ListItemIcon sx={{ mt: 1 }}>
                <Check />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h5">
                  Curate your favourite open-source projects
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ display: "flex", alignItems: "flex-start" }}>
              <ListItemIcon sx={{ mt: 1 }}>
                <Check />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h5">
                  Earn Blockos by contributing to highly valued projects
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Stack>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Stack width={400}>
          <Typography variant="h2">Log In</Typography>
          <Divider sx={{ my: 3 }} />
          <Stack direction="column" spacing={3}>
            <TextField fullWidth placeholder="Wallet Address" />
            <TextField fullWidth placeholder="Lens Handle" />
            <Button fullWidth variant="contained">
              Log In
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LogIn;
