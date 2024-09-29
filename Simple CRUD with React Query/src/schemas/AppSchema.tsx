// General Post structure
export type PostSchema = {
  id: number;
  userId?: number;
  title: string;
  body: string;
};

// Form data excluding non-input fields
export type FormDataSchema = Omit<PostSchema, "id" | "userId">;

// Reusable state handler for posts
export type PostStateHandler = React.Dispatch<
  React.SetStateAction<PostSchema[]>
>;

// For handling actions that require setting the post IDs
export type SetIdHandler = (id: number) => void;

// Schema for the CreatePost component (used for creating a new post)
export type CreatePostSchema = {
  posts: PostSchema[];
  setPosts: PostStateHandler;
};

// Schema for a list of posts (used for displaying and managing post actions)
export interface PostListSchema extends CreatePostSchema {
  setDeleteId: SetIdHandler;
  setUpdateId: SetIdHandler;
}

// Schema for a single post (used for displaying or managing individual post actions)
export interface SinglePostSchema {
  item: PostSchema;
  setDeleteId: SetIdHandler;
  setUpdateId: SetIdHandler;
}

// Schema for updating a post
export interface UpdatePostSchema extends CreatePostSchema {
  id: number;
  setUpdateId: SetIdHandler;
}

// Schema for deleting a post
export interface DeletePostSchema {
  id: number;
  setDeleteId: SetIdHandler;
  setPosts: PostStateHandler;
}
