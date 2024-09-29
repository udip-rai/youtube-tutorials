// Import - node_modules
import { AxiosError } from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

// Import - schemas
import { PostSchema, DeletePostSchema } from "../schemas/AppSchema";

// Import - services
import { deleteItem } from "../services/api_service";

// Main
const DeletePost = (props: DeletePostSchema) => {
  // Props
  const { id, setPosts, setDeleteId } = props;

  // Hooks
  const queryClient = useQueryClient();
  const mutation = useMutation(() => deleteItem(id), {
    onSuccess: () => {
      // Removing the post from the state
      setPosts((prev) => prev?.filter((item: PostSchema) => item.id !== id));

      // Update the cached post list in react-query
      queryClient.setQueryData<PostSchema[]>("postList", (oldData) =>
        oldData
          ? oldData.filter((item) => item.id !== id) // Remove the post with the matching id
          : []
      );

      // Hide popup by providing false values for updateId
      setDeleteId(0);
    },
    onError: () => {
      alert(`Error: ${(mutation.error as AxiosError).message}`);
    },
  });

  // Action when the form gets submitted
  const handleDeleteSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    mutation.mutate(); // Submit the form
  };

  return (
    <>
      {id ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "black",
              padding: "40px",
              borderRadius: "8px",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "2px 4px 16px rgba(0, 0, 0, 0.8)",
              transform: "translate(0%, 0%)",
            }}
          >
            <h2>Delete Post {id} ?</h2>
            <div style={{ display: "flex", gap: "20px" }}>
              <button
                type={mutation.isLoading ? "button" : "submit"}
                style={{
                  minWidth: "50%",
                  border: "1px solid white",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "red")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={handleDeleteSubmit}
              >
                {mutation.isLoading ? "Loading..." : "Yes, Delete."}
              </button>

              <button
                type={mutation.isLoading ? "button" : "submit"}
                style={{
                  minWidth: "50%",
                  border: "1px solid white",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "grey")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={() => setDeleteId(0)}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeletePost;
