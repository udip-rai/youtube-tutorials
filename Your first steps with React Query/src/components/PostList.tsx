// Import - node_modules
import { AxiosError } from "axios";
import { useQuery } from "react-query";

// Import - services
import { fetchItems } from "../services/api_service";

// Import - schemas
import { ComponentSchema, PostSchema } from "../schemas/AppSchema";

// Display a single post
const SinglePost = ({ item }: { item: PostSchema }) => (
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
      </tbody>
    </table>
  </li>
);

// Main
const PostList = ({ posts, setPosts }: ComponentSchema) => {
  // Api call to retrieve all the posts list
  const { error, isLoading } = useQuery("postList", fetchItems, {
    onSuccess: (data) => {
      if (data?.length > posts?.length) {
        setPosts(data as PostSchema[]);
      }
    },
  });

  return (
    <>
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
              <SinglePost key={index} item={item} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PostList;
