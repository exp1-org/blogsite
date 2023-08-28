import { redirect, useNavigate } from "react-router-dom";

export function getAuthToken() {
  return localStorage.getItem("token");
}

export function getIsLoggedIn() {
  const token = getAuthToken();
  if (token) {
    return true;
  }
  return false;
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    console.log("jgjygjgjgjgjkg");
    return redirect("/login");
  }
  return null;
}
