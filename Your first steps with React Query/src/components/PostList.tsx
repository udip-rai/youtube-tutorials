// Import - node_modules
import { useQuery } from "react-query";
import { AxiosError } from "axios";

// Import - schemas
import { PostSchema } from "../schemas/AppSchema";

// Import - services
import { fetchItems } from "../services/api_service";

// Display a single post
const SinglePost = ({ item }: { item: PostSchema }) => {
  return (
    <li>
      <div>
        <div>Id: {item?.id}</div>
        <div>User Id: {item?.userId}</div>
        <div>Title: {item?.title}</div>
        <div>Body: {item?.body}</div>
      </div>
    </li>
  );
};

// Main
const PostList = () => {
  // Api call to retrieve all the posts list
  const { data, error, isLoading } = useQuery("postList", fetchItems);

  return (
    <>
      {isLoading ? (
        <>Fetching posts..</>
      ) : error ? (
        <>Error: {(error as AxiosError)?.message}</>
      ) : (
        <div>
          <ul
            style={{
              listStyle: "number",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            {data?.map((item: PostSchema, index: number) => (
              <SinglePost key={index} item={item} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PostList;
