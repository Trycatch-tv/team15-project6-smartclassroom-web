import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, Container } from "@mui/material";
import Link from "@mui/material/Link";
import { Helmet } from 'react-helmet-async';
import CoursesWidget from "./coursesWidget";
import StudentsWidget from "./studentsWidget";

export default function Footer() {
    return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
        
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={4}>
            <CoursesWidget />
          </Grid>
          <Grid item xs={4}>
            <StudentsWidget />
          </Grid>
        </Grid>
      </Container>
      </>
    );
}