export type PostSchema = {
  userId?: number;
  id: number;
  title: string;
  body: string;
};

export type FormDataSchema = Omit<PostSchema, "id" | "userId">;

export type ComponentSchema = {
  posts: PostSchema[];
  setPosts: React.Dispatch<React.SetStateAction<PostSchema[]>>;
};
