// Import - node_modules
import axios, { AxiosResponse } from "axios";

// Import - schemas
import { FormDataSchema, PostSchema } from "../schemas/AppSchema";

// Get all items (GET)
export const fetchItems = async (): Promise<PostSchema[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      import.meta.env.VITE_BACKEND_API
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Create new item (POST)
export const createItem = async (
  payload: FormDataSchema
): Promise<PostSchema> => {
  try {
    const response: AxiosResponse = await axios.post(
      import.meta.env.VITE_BACKEND_API,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Update item (PUT)
export const updateItem = async (
  id: number,
  payload: FormDataSchema
): Promise<PostSchema> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${import.meta.env.VITE_BACKEND_API}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Delete item (DELETE)
export const deleteItem = async (id: number): Promise<PostSchema> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${import.meta.env.VITE_BACKEND_API}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
