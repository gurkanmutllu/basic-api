import { IUser } from "../types";
import { readFile, writeFile } from "../utils/fileHelper";
import { User } from "../models/User";

const FILE_NAME = "users.json";

export const getAllUsers = (): User[] => {
  const users = readFile<IUser>(FILE_NAME);
  return users.map(user => new User(user.id, user.name, user.email));
};

export const getUserById = (id: number): User | null => {
  const users = readFile<IUser>(FILE_NAME);
  const user = users.find(user => user.id === id);
  return user ? new User(user.id, user.name, user.email) : null;
};

export const createUser = (userData: Omit<IUser, "id">): User => {
  const users = readFile<IUser>(FILE_NAME);
  const newUser = new User(users.length + 1, userData.name, userData.email);
  users.push(newUser);
  writeFile(FILE_NAME, users);
  return newUser;
};

export const updateUser = (id: number, updatedData: Partial<IUser>): User | null => {
  const users = readFile<IUser>(FILE_NAME);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  users[userIndex] = { ...users[userIndex], ...updatedData };
  writeFile(FILE_NAME, users);
  return new User(users[userIndex].id, users[userIndex].name, users[userIndex].email);
};

export const deleteUser = (id: number): User | null => {
  const users = readFile<IUser>(FILE_NAME);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  const deletedUser = users.splice(userIndex, 1)[0];
  writeFile(FILE_NAME, users);
  return new User(deletedUser.id, deletedUser.name, deletedUser.email);
};
