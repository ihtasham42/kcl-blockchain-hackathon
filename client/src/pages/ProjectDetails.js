import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Navbar from "../components/Navbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";

const ProjectDetails = () => {
  const data = {
    title: "OpenLoops",
    description:
      "OpenLoops is an open-source music editing software that is maintained by developers all across the world! ",
    issues: [
      {
        title: "Issue #492 - Create dashboard display for data",
        details:
          "Currenly clients are unable to observe and analyse their data in a meaningful way. Build a dashboard with data visualisation interfaces which adapts to the user's data.",
        severity: "Major",
      },
      {
        title: "Issue #366 - Fix submit button spacing",
        details:
          "Currently the submit button within the creation form is too close to the above text. Correct the butotn's margin/spacing to fix this issue.",
        severity: "Micro",
      },
      {
        title: "Issue #399 - Implement hide button",
        details:
          "Currently the submit button within the creation form is too close to the above text. Correct the butotn's margin/spacing to fix this issue.",
        severity: "Minor",
      },
      {
        title: "Issue #402 - Add progress bar for uploads",
        details:
          "Currently the submit button within the creation form is too close to the above text. Correct the butotn's margin/spacing to fix this issue.",
        severity: "Minor",
      },
    ],
    topContributers: [
      { name: "Tom", contributions: 17 },
      { name: "Benny", contributions: 14 },
      { name: "Harry", contributions: 8 },
      { name: "JohnDoe", contributions: 6 },
      { name: "JaneDoe", contributions: 6 },
    ],
  };

  const issueSeverityMapping = {
    Major: "error",
    Minor: "warning",
    Micro: "success",
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Stack sx={{ mt: 5 }}>
          <Link sx={{ mb: 2 }} component={RouterLink} to="/">
            Go Back{" "}
          </Link>
          <Typography variant="h2" gutterBottom>
            {data.title}
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ marginRight: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    About
                  </Typography>
                  <Typography>{data.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ marginRight: 2 }}>
                <CardActionArea>
                  <CardContent>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <GitHubIcon sx={{ fontSize: 50 }} />
                      <Typography variant="h5">
                        Visit the Repo for {data.title}!
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Most Important Issues
          </Typography>
          <Box sx={{ mt: 2 }}>
            {data.issues.map((issue) => (
              <Accordion variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h6">{issue.title}</Typography>
                    <Chip
                      label={issue.severity}
                      color={issueSeverityMapping[issue.severity]}
                    />
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ mb: 3 }}>{issue.details}</Typography>
                  <Button variant="contained" sx={{ mb: 1 }}>
                    View Issue on GitHub
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Typography variant="h5" sx={{ mt: 2, my: 2 }}>
            Top Contributors
          </Typography>
          <Card variant="outlined" sx={{ mb: 4 }}>
            <List>
              {data.topContributers.map((contributor, i) => (
                <Box>
                  <ListItem>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ width: "100%" }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h5">#{i + 1}</Typography>
                        <Avatar
                          src={"https://robohash.org/" + contributor.name}
                        />
                        <Typography>{contributor.name}</Typography>
                      </Stack>
                      <Chip
                        color="info"
                        label={contributor.contributions + " contributions"}
                      />
                    </Stack>
                  </ListItem>
                  {i != data.topContributers.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProjectDetails;
