import axios from "axios";

const base = process.env.REACT_APP_BASE_URL;
const blogURL = base + process.env.REACT_APP_BLOG_URL;
const getAllBlogsURL = base + process.env.REACT_APP_ADD_GET_BLOGS_URL;

export const getBlog = async (blogId) => {
  try {
    const url = `${blogURL}/${blogId}`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogs = async () => {
  try {
    console.log(getAllBlogsURL);
    const response = await axios.get(getAllBlogsURL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
