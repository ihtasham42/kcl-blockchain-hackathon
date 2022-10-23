import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Navbar from "../components/Navbar";
import ProjectCardContainer from "../components/ProjectCardContainer";

const Home = () => {
  return (
    <Box>
      <Container maxWidth="md">
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="h2" gutterBottom>
            Welcome to BlockHub.
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Curate projects and evaluate your contributions here at BlockHub.
          </Typography>
        </Box>
        <ProjectCardContainer />
      </Container>
    </Box>
  );
};

export default Home;
