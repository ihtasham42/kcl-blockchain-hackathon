import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const ProjectCard = ({ data, i, handle, votes }) => {
  return (
    <Card variant="outlined" sx={{ m: 2 }}>
      <CardMedia
        component="img"
        height={140}
        image={"https://picsum.photos/500/500?random=" + i}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography color="text.secondary" variant="subtitle2">
          {handle}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {data.content}
        </Typography>

        <Typography>{data.description}</Typography>
        <Stack
          mt={3}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Chip
            label={votes + " votes"}
            color="success"
            sx={{ width: 115, fontSize: 20 }}
          />
          <Button variant="contained" component={RouterLink} to="/projects">
            Contribute
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
