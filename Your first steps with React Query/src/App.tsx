// Import - node_modules
import { useState } from "react";

// Import - assets
import "./App.css";

// Import - components
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

// Import - schemas
import { PostSchema } from "./schemas/AppSchema";

// Main
const App = () => {
  // States
  const [posts, setPosts] = useState<PostSchema[]>([]); // Store all the posts inside here

  // Common props for components
  const commonProps = { posts, setPosts };

  return (
    <div>
      <CreatePost {...commonProps} />
      <PostList {...commonProps} />
    </div>
  );
};

export default App;
