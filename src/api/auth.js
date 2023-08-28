import axios from "axios";

const base = process.env.REACT_APP_BASE_URL;
const loginURL = base + process.env.REACT_APP_LOGIN_URL;
const registerURL = base + process.env.REACT_APP_REGISTER_URL;

export const login = async (crdentials) => {
  try {
    const response = await axios.post(loginURL, crdentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (crdentials) => {
  try {
    const response = await axios.post(registerURL, crdentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
