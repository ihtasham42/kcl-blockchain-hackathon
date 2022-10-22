import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const ProjectCard = ({ data }) => {
  return (
    <Card variant="outlined" sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {data.title}
        </Typography>
        <Typography>{data.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
