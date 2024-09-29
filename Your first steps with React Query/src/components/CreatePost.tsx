// Import - node_modules
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

// Import - schemas
import {
  ComponentSchema,
  FormDataSchema,
  PostSchema,
} from "../schemas/AppSchema";

// Import - services
import { createItem } from "../services/api_service";

// Main
const CreatePost = ({ posts, setPosts }: ComponentSchema) => {
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
  const mutation = useMutation(() => createItem(formData), {
    onSuccess: (data: PostSchema) => {
      const result: PostSchema = { ...data, id: posts?.length + 1, userId: 3 };
      setPosts((prev) => [...prev, result]);
      queryClient.setQueryData<PostSchema[]>("postList", (oldData) =>
        oldData ? [...oldData, result] : [result]
      );
      // Reset form data and errors
      setFormData({ title: "", body: "" });
      setFormErrors({ title: "", body: "" });
    },
    onError: () => {
      alert(`Error: ${(mutation.error as AxiosError).message}`);
    },
  });

  // Action when the form gets submitted
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = { title: "", body: "" };
    if (!formData.title) errors.title = "Title is required.";
    if (!formData.body) errors.body = "Body is required.";

    if (errors.title || errors.body) {
      setFormErrors(errors); // Set the errors to state
      return; // Stop further execution if there are errors
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
    <div style={{ textAlign: "left" }}>
      <h1>Create Post</h1>
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
            value={formData.title}
            onChange={handleInputChange}
            style={{ minWidth: "300px" }}
          />
        </div>
        {formErrors.title && <p style={{ color: "red" }}>{formErrors.title}</p>}

        <div style={{ display: "flex", gap: "20px" }}>
          <label htmlFor="body" style={{ minWidth: "100px" }}>
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            style={{ minWidth: "300px", height: "100px" }}
          />
        </div>
        {formErrors.body && <p style={{ color: "red" }}>{formErrors.body}</p>}

        <div style={{ display: "flex", gap: "20px" }}>
          <button
            type={mutation.isLoading ? "button" : "submit"}
            style={{
              minWidth: "calc(100px + 300px + 20px + 4px)",
              border: "1px solid white",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "teal")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {mutation.isLoading ? "Loading..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
