import React, { useEffect, useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { getAuthToken } from "../../../utils/auth";
import Alertt from "../../common/Alertt";
import { CardContent } from "@mui/material";

const base = process.env.REACT_APP_BASE_URL;
const createBlogUrl = base + process.env.REACT_APP_CREATE_BLOG;

const defaultTheme = createTheme();
const BlogForm = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const blogResponse = useActionData();

  let article = "";
  let blogName = "";
  let authorName = "";
  let category = "";

  if (props.blog) {
    article = props.blog.article;
    blogName = props.blog.blogName;
    authorName = props.blog.authorName;
    category = props.blog.category;
  }
  useEffect(() => {
    if (blogResponse) {
      if (blogResponse.errorMsg !== undefined) {
        seterrorMsg(blogResponse.errorMsg);
        console.log(errorMsg);
        setOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogResponse]);

  const AlertCloseHandler = () => {
    setOpen(false);
  };
  const cancelHandler = () => {
    navigate("/blogs");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ backgroundColor: "white", padding: 2, boxShadow: 3, mb: 5 }}>
            <CardContent>
              <Typography component="h1" variant="h5">
                {props.method === "post" ? "Create" : "Update"} Blog
              </Typography>

              <Box Validate sx={{ mt: 3 }}>
                <Form method={props.method}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="author-name"
                        name="authorName"
                        required
                        fullWidth
                        id="Name"
                        label="Author Name"
                        defaultValue={authorName}
                        autoFocus
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="blogName"
                        label="Blog Name"
                        name="blogName"
                        defaultValue={blogName}
                        autoComplete="blog-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="category"
                        label="category"
                        id="category"
                        defaultValue={category}
                        autoComplete="category"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <textarea
                        rows={20}
                        cols={100}
                        name="article"
                        label="article"
                        id="article"
                        defaultValue={article}
                        placeholder="Enter your blog article.."
                        required
                      ></textarea>
                    </Grid>
                  </Grid>
                  <Alertt
                    open={open}
                    AlertCloseHandler={AlertCloseHandler}
                    message={errorMsg}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#5F264A" }}
                  >
                    {props.method === "post" ? "Create" : "Update"}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml: 2, backgroundColor: "#5F264A" }}
                    onClick={cancelHandler}
                  >
                    Cancel
                  </Button>
                </Form>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BlogForm;

export async function action({ request, params }) {
  const Authorization = "Bearer " + getAuthToken();
  const data = await request.formData();
  console.log(request.method);

  const reqData = {
    authorname: data.get("authorName"),
    blogname: data.get("blogName"),
    category: data.get("category"),
    article: data.get("article"),
  };

  try {
    if (request.method === "POST") {
      try {
        await axios.post(createBlogUrl, reqData, {
          headers: {
            Authorization,
          },
        });
      } catch (error) {
        return json(
          { errorMsg: error.response.data.error },
          { status: error.response.status }
        );
      }
    } 
    // else if (request.method === "PUT") {
    //   const blogId = params.id;
    //   const updateUrl = updateBlogUrl + `/${blogId}`;
    //   const res = await axios.put(updateUrl, reqData, {
    //     headers: {
    //       Authorization,
    //     },
    //   });
    // }
  } catch (error) {
    return json(
      { errorMsg: error.response.data.error },
      { status: error.response.status }
    );
  }

  return redirect("/blogs");
}
