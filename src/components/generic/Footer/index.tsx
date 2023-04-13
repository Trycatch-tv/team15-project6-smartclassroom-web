import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        display: "flex",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Conoce más sobre estre proyecto "}
          <Link color="inherit" href=" ">
            aquí
          </Link>{" "}
          {new Date().getFullYear()}.
          <Link
            color="inherit"
            href="https://github.com/Trycatch-tv/team15-project6-smartclassroom-web"
          >
            {" "}
            <GitHubIcon />{" "}
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
