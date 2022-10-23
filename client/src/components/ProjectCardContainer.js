import { Card, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { explorePublications } from "./utils/LensProtocol/publication";
const source = "blockerino1";
const ProjectCardContainer = () => {
  // const cardData = [
  //   {
  //     title: "Linux",
  //     description: "This is an example of an open source project",
  //     votes: 232,
  //   },
  //   {
  //     title: "Etherium",
  //     description: "This is an example of an open source project",
  //     votes: 322,
  //   },
  //   {
  //     title: "OpenLoops",
  //     description: "This is an example of an open source project",
  //     votes: 182,
  //   },
  //   {
  //     title: "OpenMedia",
  //     description: "This is an example of an open source project",
  //     votes: 46,
  //   },
  // ];

  const [cardData, setCardData] = useState([]);

  const getPublications = async () => {
    const request = {
      sortCriteria: "LATEST",
      publicationTypes: ["POST"],
      sources: [source],
    };
    const publications = await explorePublications(request);
    setCardData(publications.data.explorePublications.items);
  };

  useEffect(() => {
    getPublications();
  });

  return (
    <Grid container sx={{ mt: 3 }}>
      {cardData &&
        cardData.map((data, i) => (
          <Grid item xs={6}>
            <ProjectCard
              data={data.metadata}
              key={i}
              i={i}
              handle={data.profile.handle}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default ProjectCardContainer;
