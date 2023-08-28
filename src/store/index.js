import { configureStore } from "@reduxjs/toolkit";

import { blogReducer } from "./blog-slice";
import { authReducer } from "./auth-slice";

const store = configureStore({
  reducer: { blog: blogReducer, auth: authReducer },
});

export default store;
