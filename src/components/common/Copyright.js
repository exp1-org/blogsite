import { Typography } from "@mui/material";

const Copyright = (props) => {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ fontWeight: "500", color: "#fff" }}
        {...props}
      >
        {"Copyright © "}
        {new Date().getFullYear()}
        {" :  BlogService.com"}
      </Typography>
    </>
  );
};

export default Copyright;
