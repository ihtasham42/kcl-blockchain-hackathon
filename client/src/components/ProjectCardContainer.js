import { Card, Grid } from "@mui/material";
import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectCardContainer = () => {
  const cardData = [
    {
      title: "Open Source Project",
      description: "This is an example of an open source project",
    },
    {
      title: "Open Source Project",
      description: "This is an example of an open source project",
    },
    {
      title: "Open Source Project",
      description: "This is an example of an open source project",
    },
    {
      title: "Open Source Project",
      description: "This is an example of an open source project",
    },
    {
      title: "Open Source Project",
      description: "This is an example of an open source project",
    },
  ];

  return (
    <Grid container sx={{ mt: 3 }}>
      {cardData.map((data) => (
        <Grid item xs={6}>
          <ProjectCard data={data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectCardContainer;
