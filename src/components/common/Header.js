import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { useSnackbar } from "notistack";
import { useRouteLoaderData, useSubmit, Link } from "react-router-dom";
import Modal from "./Modal";
import BookIcon from '@mui/icons-material/Book';

const Header = () => {
  const [modelOpen, setModalOpen] = React.useState(false);
  const submit = useSubmit();
  const isLoggedIn = useRouteLoaderData("token-loader");
  const { enqueueSnackbar } = useSnackbar();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const backBtnHandler = () => {
    setModalOpen(false);
  };
  const okBtnHandler = () => {
    setModalOpen(false);
    submit(null, { method: "post", action: `/logout` });
  };

  const logoutHandler = () => {
    setModalOpen(true);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 3000,
    });
  };

  const createBlogHandler = () => {
    if (!isLoggedIn) {
      showSnack("Please Login first!", "error");
    }
  };

  const myBlogsHandler = () => {
    if (!isLoggedIn) {
      showSnack("Please Login first!", "error");
    }
  };

  const logoHandler = () => {
    if (!isLoggedIn) {
      showSnack("Please Login first!", "error");
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#5F264A" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
              onClick={logoHandler}
            >
              <Link
                to={isLoggedIn ? "/blogs" : "/"}
                style={{ textDecoration: "none", color: "white" }}
              >
                BLOGCART
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Button
                sx={{ my: 2, color: "#50bfa0", display: "block" }}
                onClick={handleCloseNavMenu}
              >
                <Link to={`/blogs`} style={{ textDecoration: "none" }}>
                  Blogs
                </Link>
              </Button>

              <Link to={`/blogs/create`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ my: 2, color: "#50bfa0", display: "block" }}
                  onClick={createBlogHandler}
                >
                  Create Blog
                </Button>
              </Link>
              <Link to={`/myBlogs`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ my: 2, color: "#50bfa0", display: "block" }}
                  onClick={myBlogsHandler}
                >
                  My Blogs
                </Button>
              </Link>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#50bfa0",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to={`/blogs`} style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "#fff", display: "block" }}>
                  Blogs
                </Button>
              </Link>
              <Link to={`/blogs/create`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ my: 2, color: "#fff", display: "block" }}
                  onClick={createBlogHandler}
                >
                  Create Blog
                </Button>
              </Link>
              <Link to={`/myBlogs`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ my: 2, color: "#fff", display: "block" }}
                  onClick={myBlogsHandler}
                >
                  My Blogs
                </Button>
              </Link>
            </Box>

            {isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  textAlign="center"
                  type="submit"
                  sx={{ backgroundColor: "#B0A4A4" }}
                  variant="contained"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={modelOpen}
        header="Logout ?"
        text="Do you want to logout, session wil lbe lost!"
        okBtn="logout"
        backBtn="stay signed in"
        useOkBtnHandler={okBtnHandler}
        useBackBtnHandler={backBtnHandler}
      />
    </>
  );
};
export default Header;
