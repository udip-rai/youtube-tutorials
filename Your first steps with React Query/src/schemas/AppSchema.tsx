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

export type SinglePostSchema = {
  item: PostSchema;
  setDeleteId: (id: number) => void;
  setUpdateId: (id: number) => void;
};

export interface UpdatePostSchema extends ComponentSchema {
  id: number;
  setUpdateId: (id: number) => void;
}

export type DeletePostSchema = {
  id: number;
  setDeleteId: (id: number) => void;
  setPosts: React.Dispatch<React.SetStateAction<PostSchema[]>>;
};
