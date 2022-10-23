import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

const Leaderboard = () => {
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
          <Card variant="outlined" sx={{ padding: 3 }}>
            <Stack direction="row" alignItems={"center"}>
              <Chip
                label="#1"
                sx={{ backgroundColor: "gold", fontSize: "30px", py: 3 }}
              />
            </Stack>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Leaderboard;
