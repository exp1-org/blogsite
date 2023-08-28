import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Alertt from "../common/Alertt";
import { Card, CardContent } from "@mui/material";

const base = process.env.REACT_APP_BASE_URL;
const registerURL = base + process.env.REACT_APP_REGISTER_URL;

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = useRouteLoaderData("token-loader");
  const signUpResponse = useActionData();

  React.useEffect(() => {
    console.log("useEffect");
    if (isLoggedIn) {
      navigate("/blogs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = React.useState(false);
  const [errorMsg, seterrorMsg] = React.useState("");
  React.useEffect(() => {
    if (signUpResponse) {
      if (signUpResponse.errorMsg !== undefined) {
        seterrorMsg(signUpResponse.errorMsg);
        console.log(errorMsg);
        setOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpResponse]);
  const AlertCloseHandler = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{padding: 12}}>
        <CssBaseline />
        <div style={{ margin: "15% auto" }}>
          <Card sx={{ backgroundColor: "white", padding: 2, boxShadow: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box noValidate sx={{ mt: 3 }}>
                  <Form method="post">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="name"
                          required
                          fullWidth
                          id="Name"
                          label="Name"
                          autoFocus
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                    </Grid>

                    <Alertt
                      open={open}
                      AlertCloseHandler={AlertCloseHandler}
                      message={errorMsg}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, backgroundColor: "#5F264A" }}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link to={"/login"} style={{ textDecoration: "none" }}>
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

export async function action({ request, params }) {
  const data = await request.formData();

  const signUpData = {
    username: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    const res = await axios.post(registerURL, signUpData);
    // if (res.data.token) {
    //   localStorage.setItem("token", res.data.token);
    // }
    console.log(res.data.token);
    return redirect("/login");
  } catch (error) {
    return json(
      { errorMsg: error.response.data.error },
      { status: error.response.status }
    );
  }
}
