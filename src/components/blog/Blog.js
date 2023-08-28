import React from "react";
import {
  useLoaderData,
  useRouteLoaderData,
  redirect,
  json,
  useNavigate,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import FeaturedPost from "./FeaturedPost";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Chip } from "@mui/material";

const base = process.env.REACT_APP_BASE_URL;
const blogURL = base + process.env.REACT_APP_BLOG_URL;
const deleteBlogURL = base + process.env.REACT_APP_DELETE_BLOG;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const allBlogsData = useRouteLoaderData("all-blogs");
  const blogData = useRouteLoaderData("single-blog");
  const navigate = useNavigate();
  const handleChipClick = () => {
    navigate("..");
  };

  const randomPost = () => Math.floor(Math.random() * allBlogsData.length);
  const featuredPosts = [
    allBlogsData[randomPost()],
    allBlogsData[randomPost()],
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <div>
            <Chip
              icon={<ArrowBackIosNewIcon />}
              label="Blogs"
              onClick={handleChipClick}
              sx={{ my: 5, fontSize: 18 }}
            />
          </div>
          <MainFeaturedPost blog={blogData} />
          <Grid container spacing={4}>
            {featuredPosts.map((blog) => (
              <FeaturedPost key={blog._id} blog={blog} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main blog={blogData} />
            <Sidebar
              title={blogData.authorname}
              description={blogData.timestamp}
              category={blogData.category}
            />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export async function loader({ request, params }) {
  const token = getAuthToken();
  const Authorization = "Bearer " + token;
  const url = `${blogURL}/${params.id}`;
  console.log(url);
  try {
    const response = await axios.get(url, { headers: { Authorization } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
    throw json({ errorMsg: error.response.data.error });
  }
}
export async function action({ request, params }) {
  const Authorization = "Bearer " + getAuthToken();
  const blogId = params.id;
  const deleteUrl = deleteBlogURL + `/${blogId}`;
  try {
    const res = await axios.delete(deleteUrl, { headers: { Authorization } });
  } catch (error) {
    throw json(
      { errorMsg: error.response.data.error },
      { status: error.response.status }
    );
  }

  return redirect("/blogs");
}
