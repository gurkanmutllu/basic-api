import { IPost } from "../types";
import { readFile, writeFile } from "../utils/fileHelper";
import { Post } from "../models/Post";

const FILE_NAME = "posts.json";

export const getAllPosts = (): Post[] => {
  const posts = readFile<IPost>(FILE_NAME);
  return posts.map(post => new Post(post.id, post.title, post.content, post.userId));
};

export const getPostById = (id: number): Post | null => {
  const posts = readFile<IPost>(FILE_NAME);
  const post = posts.find(post => post.id === id);
  return post ? new Post(post.id, post.title, post.content, post.userId) : null;
};

export const createPost = (postData: Omit<IPost, "id">): Post => {
  const posts = readFile<IPost>(FILE_NAME);
  const newPost = new Post(
    posts.length + 1,
    postData.title,
    postData.content,
    postData.userId
  );
  posts.push(newPost);
  writeFile(FILE_NAME, posts);
  return newPost;
};

export const updatePost = (id: number, updatedData: Partial<IPost>): Post | null => {
  const posts = readFile<IPost>(FILE_NAME);
  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex === -1) return null;

  posts[postIndex] = { ...posts[postIndex], ...updatedData };
  writeFile(FILE_NAME, posts);

  return new Post(
    posts[postIndex].id,
    posts[postIndex].title,
    posts[postIndex].content,
    posts[postIndex].userId
  );
};

export const deletePost = (id: number): Post | null => {
  const posts = readFile<IPost>(FILE_NAME);
  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex === -1) return null;

  const deletedPost = posts.splice(postIndex, 1)[0];
  writeFile(FILE_NAME, posts);

  return new Post(
    deletedPost.id,
    deletedPost.title,
    deletedPost.content,
    deletedPost.userId
  );
};
