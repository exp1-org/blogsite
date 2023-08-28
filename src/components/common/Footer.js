import { Box } from "@mui/material";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#5F264A", p: 3 }} component="footer">
      <Copyright />
    </Box>
  );
};

export default Footer;
