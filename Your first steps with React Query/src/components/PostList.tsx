// Import - node_modules
import { AxiosError } from "axios";
import { useQuery } from "react-query";

// Import - services
import { fetchItems } from "../services/api_service";

// Import - schemas
import {
  ComponentSchema,
  PostSchema,
  SinglePostSchema,
} from "../schemas/AppSchema";
import { useState } from "react";
import UpdatePost from "./UpdatePost";

// Display a single post
const SinglePost = (params: SinglePostSchema) => {
  // Params
  const { item, setDeleteId, setUpdateId } = params;

  return (
    <li style={{ textAlign: "left" }}>
      <table>
        <tbody>
          <tr>
            <td>
              <b>Id: </b>
            </td>
            <td>{item?.id}</td>
          </tr>
          <tr>
            <td>
              <b>User Id: </b>
            </td>
            <td>{item?.userId}</td>
          </tr>
          <tr>
            <td>
              <b>Title: </b>
            </td>
            <td>{item?.title}</td>
          </tr>
          <tr>
            <td>
              <b>Body: </b>
            </td>
            <td>{item?.body}</td>
          </tr>
          <tr>
            <td>
              <b>Actions: </b>
            </td>
            <td style={{ display: "flex", gap: "20px", padding: "0 20px" }}>
              <button
                style={{ backgroundColor: "green" }}
                onClick={() => setUpdateId(item?.id)}
              >
                Update post
              </button>
              <button
                style={{ backgroundColor: "crimson" }}
                onClick={() => setDeleteId(item?.id)}
              >
                Delete post
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  );
};

// Main
const PostList = (props: ComponentSchema) => {
  // Props
  const { posts, setPosts } = props;

  // States
  const [updateId, setUpdateId] = useState<number>();
  const [deleteId, setDeleteId] = useState<number>();

  // Api call to retrieve all the posts list
  const { error, isLoading } = useQuery("postList", fetchItems, {
    onSuccess: (data) => {
      if (data?.length > posts?.length) {
        setPosts(data as PostSchema[]);
      }
    },
  });

  // Custom props for single post
  // const deletePostProps = { id: updateId, posts, setPosts };
  const singlePostProps = { setDeleteId, setUpdateId };
  const updatePostProps = {
    id: updateId as number,
    posts,
    setUpdateId,
    setPosts,
  };

  return (
    <>
      <UpdatePost {...updatePostProps} />

      {isLoading ? (
        <>Fetching posts..</>
      ) : error ? (
        <>Error: {(error as AxiosError)?.message}</>
      ) : (
        <div style={{ textAlign: "left" }}>
          <h1>Post List</h1>
          <ul
            style={{
              listStyle: "number",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            {posts?.map((item: PostSchema, index: number) => (
              <SinglePost key={index} item={item} {...singlePostProps} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PostList;
