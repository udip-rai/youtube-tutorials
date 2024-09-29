// Import - node_modules
import { useState } from "react";

// Import - assets
import "./App.css";

// Import - components
import CreatePost from "./components/CreatePost";
import DeletePost from "./components/DeletePost";
import PostList from "./components/PostList";
import UpdatePost from "./components/UpdatePost";

// Import - schemas
import { PostSchema } from "./schemas/AppSchema";

// Main
const App = () => {
  // States
  const [posts, setPosts] = useState<PostSchema[]>([]); // Store all the posts inside here
  const [updateId, setUpdateId] = useState<number>();
  const [deleteId, setDeleteId] = useState<number>();

  // Common props for components
  const createPostProps = { posts, setPosts };
  const deletePostProps = {
    id: deleteId as number,
    setPosts,
    setDeleteId,
  };
  const postListProps = { posts, setPosts, setDeleteId, setUpdateId };
  const updatePostProps = {
    id: updateId as number,
    posts,
    setUpdateId,
    setPosts,
  };

  return (
    <div>
      <h1 style={{ textDecoration: "underline", color: "greenyellow" }}>
        CRUD using React Query
      </h1>
      <CreatePost {...createPostProps} />
      <DeletePost {...deletePostProps} />
      <PostList {...postListProps} />
      <UpdatePost {...updatePostProps} />
    </div>
  );
};

export default App;
