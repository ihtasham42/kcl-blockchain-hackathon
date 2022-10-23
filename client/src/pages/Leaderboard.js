import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

const colorMappings = {
  1: "gold",
  2: "silver",
  3: "bronze",
};

const Leaderboard = () => {
  const leaderboardData = [
    { name: "Bob", blockos: 16480, contributions: "114" },
    { name: "Harry", blockos: 14030, contributions: "97" },
    { name: "Benny", blockos: 13640, contributions: "95" },
    { name: "TestUser", blockos: 12930, contributions: "85" },
    { name: "Giraffe", blockos: 11800, contributions: "76" },
    { name: "Dolphin22", blockos: 10400, contributions: "60" },
    { name: "Chair9", blockos: 9470, contributions: "58" },
    { name: "Sam", blockos: 8930, contributions: "55" },
    { name: "EasyA", blockos: 8890, contributions: "37" },
    { name: "Polygon", blockos: 7210, contributions: "31" },
  ];

  return (
    <Box>
      <Container maxWidth="md">
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="h2" gutterBottom>
            BlockHub Leaderboard
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
            Top BlockHubbers have the oppurtunity to be scouted by employers!
          </Typography>

          {leaderboardData.map((data, i) => (
            <Card variant="outlined" sx={{ padding: 3, mb: 2 }}>
              <Stack
                justifyContent={"space-between"}
                alignItems="center"
                direction="row"
              >
                <Stack direction="row" alignItems={"center"} spacing={3}>
                  <Chip
                    label={"#" + (i + 1)}
                    sx={{
                      backgroundColor:
                        i + 1 <= 3 ? colorMappings[i + 1] : "#CCE5FF",
                      fontSize: "30px",
                      py: 3,
                    }}
                  />
                  <Avatar
                    src={"https://robohash.org/" + data.name}
                    sx={{ width: 60, height: 60 }}
                  />
                  <Typography variant="h5">{data.name}</Typography>
                </Stack>
                <Stack direction="row" alignItems={"center"} spacing={2}>
                  <Chip
                    label={data.blockos + " Blockos"}
                    sx={{ fontSize: "20px", py: 3 }}
                    color="info"
                  />
                  <Chip
                    label={data.contributions + " Contributions"}
                    sx={{ fontSize: "20px", py: 3 }}
                    color="success"
                  />
                </Stack>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Leaderboard;
