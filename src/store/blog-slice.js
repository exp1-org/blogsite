import { createSlice } from "@reduxjs/toolkit";


const initialState = { blogs: [] };

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    allBlogs(state, action) {
      state.blogs = action.payload;
    },
  },
});


export const blogReducer = blogSlice.reducer;
export const blogActions = blogSlice.actions;
