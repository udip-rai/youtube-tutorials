// Import - node_modules
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

// Import - schemas
import {
  FormDataSchema,
  PostSchema,
  UpdatePostSchema,
} from "../schemas/AppSchema";

// Import - services
import { updateItem } from "../services/api_service";

// Main
const UpdatePost = (props: UpdatePostSchema) => {
  // Props
  const { id, posts, setPosts, setUpdateId } = props;

  // Variables from props
  const itemToUpdate = {
    title: posts?.[id - 1]?.title,
    body: posts?.[id - 1]?.body,
  };

  // States
  const [formData, setFormData] = useState<FormDataSchema>({
    title: "",
    body: "",
  }); // Final form data
  const [formErrors, setFormErrors] = useState<FormDataSchema>({
    title: "",
    body: "",
  }); // Store all the form errors

  // Hooks
  const queryClient = useQueryClient();
  const mutation = useMutation(() => updateItem(id, formData), {
    onSuccess: (data: PostSchema) => {
      const result: PostSchema = { ...data, userId: 3 };
      setPosts((prev) =>
        prev?.map((item: PostSchema) => (item.id === id ? result : item))
      );

      // Update the cached post list in react-query
      queryClient.setQueryData<PostSchema[]>("postList", (oldData) =>
        oldData
          ? oldData.map(
              (item) => (item.id === result.id ? result : item) // Replace the post with the updated one
            )
          : [result]
      );

      // Reset form data and errors
      setFormData({ title: "", body: "" });
      setFormErrors({ title: "", body: "" });

      // Hide popup by providing false values for updateId
      setUpdateId(0);
    },
    onError: () => {
      alert(`Error: ${(mutation.error as AxiosError).message}`);
    },
  });

  // Action when the form gets submitted
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Initialize errors
    const errors = { title: "", body: "" };

    // Error validation for empty cases
    if (!formData.title && itemToUpdate.title)
      errors.title = "Title is required.";
    if (!formData.body && itemToUpdate.body) errors.body = "Body is required.";

    // Error validation for empty cases
    if (errors.title || errors.body) {
      setFormErrors(errors); // Set the errors to state
      return;
    }

    // Validation for the same item object
    if (
      formData.title === itemToUpdate.title &&
      formData.body === itemToUpdate.body
    ) {
      if (formData.title === itemToUpdate.title) {
        errors.title = "Please change some value to update.";
        return;
      } else {
        errors.body = "Please change some value to update.";
        return;
      }
    }

    mutation.mutate(); // Submit the form
  };

  // Action when the input changes for onChange event
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            <h2>Update Post {id}</h2>
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                fontSize: "32px",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "red")}
              onMouseOut={(e) => (e.currentTarget.style.color = "white")}
              onClick={() => {
                setUpdateId(0);
                setFormErrors({
                  title: "",
                  body: "",
                });
              }}
            >
              ✖
            </button>
            <form
              onSubmit={handleFormSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <label htmlFor="title" style={{ minWidth: "100px" }}>
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || posts?.[id - 1]?.title}
                  onChange={handleInputChange}
                  style={{ minWidth: "600px" }}
                />
              </div>
              {formErrors.title && (
                <p style={{ color: "red" }}>{formErrors.title}</p>
              )}

              <div style={{ display: "flex", gap: "20px" }}>
                <label htmlFor="body" style={{ minWidth: "100px" }}>
                  Body
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body || posts?.[id - 1]?.body}
                  onChange={handleInputChange}
                  style={{ minWidth: "600px", height: "100px" }}
                />
              </div>
              {formErrors.body && (
                <p style={{ color: "red" }}>{formErrors.body}</p>
              )}

              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  type={mutation.isLoading ? "button" : "submit"}
                  style={{
                    minWidth: "calc(100px + 600px + 20px + 4px)",
                    border: "1px solid white",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "teal")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {mutation.isLoading ? "Loading..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdatePost;
