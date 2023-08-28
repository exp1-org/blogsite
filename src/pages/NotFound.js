import classes from "./css/NotFound.module.css";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import { Link, useRouteError } from "react-router-dom";

const primary = grey[800];

const NotFound = () => {
  const error = useRouteError();
  let message = "The page you’re looking for doesn’t exist";

  if (error && error.data.errorMsg) {
    message = error.data.errorMsg;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        {error.status}
        {/* {JSON.stringify(error)} */}
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        {message}
      </Typography>
      <br />
      <Button variant="contained">
        <Link to={"/blogs"} style={{ textDecoration: "none", color: "white" }}>
          Back Home
        </Link>
      </Button>
    </Box>
  );
};

export default NotFound;
