import BlogForm from "../components/blog/create/BlogForm";
import { useRouteLoaderData } from "react-router-dom";

const EditBlog = () => {
  const blogData = useRouteLoaderData("single-blog");
  return <BlogForm method="put" blog={blogData.data} />;
};

export default EditBlog;
