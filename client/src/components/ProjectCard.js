import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  ToggleButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Upvote from "./UpvoteButton";

const ProjectCard = ({ data }) => {
  return (
    <Card variant="outlined" sx={{ m: 2 }}>
      <CardMedia
        component="img"
        height={140}
        image="https://picsum.photos/500/500"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {data.title}
        </Typography>
        <Typography>{data.description}</Typography>
        <Stack
          mt={3}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
        {/* <ToggleButton
          value="upvote"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          {selected ?  <BsArrowUpCircle/> :  <BsArrowUpCircleFill/>}
        </ToggleButton> */}
        <Upvote />
          {/* <Chip
            label = "votes"
            color="success"
            sx={{ width: 115, fontSize: 20 }}
          /> */}
          <Button variant="contained">Contribute</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
