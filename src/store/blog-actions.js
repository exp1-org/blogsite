import { getBlogs } from "../api/blog";
import { blogActions } from "./blog-slice";


export const getAllBlogsT = () => {
    return async (dispatch) => {
      try {
        const response = await getBlogs();
        dispatch(blogActions.allBlogs(response.data))
      } catch (error) {}
    };
  };