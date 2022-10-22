import { Box, Container } from "@mui/system";
import React from "react";
import Navbar from "../components/Navbar";

const ProjectDetails = ({ data }) => {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="md"></Container>
    </Box>
  );
};

export default ProjectDetails;
