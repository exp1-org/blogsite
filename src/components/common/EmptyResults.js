import { Box, Button, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const EmptyResults = ({ text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const createBlogHandler = () => {
    navigate("/blogs/create");
  }
  return (
    <Box
      sx={{
        margin: "7% auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1" style={{ color: "#121138" }}>
        !
      </Typography>
      <Typography variant="h5" style={{ color: "#121138" }}>
        {text}
      </Typography>
      {location.pathname === "/myBlogs" && <Button
        sx={{mt: 2, backgroundColor: "#50bfa0"}}
        color="secondary"
        variant="contained"
        onClick={createBlogHandler}>
          Create Blog
      </Button>}
      <br />
    </Box>
  );
};

export default EmptyResults;
