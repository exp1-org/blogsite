import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Form,
  json,
  Link,
  redirect,
  useActionData,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import axios from "axios";
import Alertt from "../common/Alertt";

// TODO remove, this demo shouldn't need to reset the theme.

const base = process.env.REACT_APP_BASE_URL;
const loginURL = base + process.env.REACT_APP_LOGIN_URL;

const defaultTheme = createTheme();

const SignIn = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = useRouteLoaderData("token-loader");
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/blogs");
    }
  }, []);
  const [open, setOpen] = React.useState(false);
  const [errorMsg, seterrorMsg] = React.useState("");
  const loginResponse = useActionData();
  React.useEffect(() => {
    if (loginResponse) {
      if (loginResponse.errorMsg !== undefined) {
        seterrorMsg(loginResponse.errorMsg);
        console.log(errorMsg);
        setOpen(true);
      }
    }
  }, [loginResponse]);
  const AlertCloseHandler = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{padding: 5}}>
        <CssBaseline />
        <div style={{margin: "20% auto"}}>
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
              Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <Form method="post">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
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
                  Sign In
                </Button>
              </Form>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to={"/register"} style={{ textDecoration: "none" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card >
      </div>
    </Container>
    </ThemeProvider >
  );
};

export default SignIn;

export async function action({ request, params }) {
  const data = await request.formData();
  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };
  console.log(loginData);
  try {
    const res = await axios.post(loginURL, loginData);
    console.log(res.data.substring(7));
    if (res.data.substring(7)) {
      localStorage.setItem("token", res.data.substring(7));
    }
    return redirect("/blogs");
  } catch (error) {
    return json(
      { errorMsg: error.response.data.error },
      { status: error.response.status }
    );
  }
}
