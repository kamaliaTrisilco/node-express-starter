import { IUser, IAddUser } from "@/types/User.t.js";

let users: IUser[] = [
  { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: "Jane Doe", username: "janedoe", email: "jane@example.com", createdAt: new Date(), updatedAt: new Date() }
];

let currentId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
const generateId = (): number => {
  currentId += 1;
  return currentId;
};

export const createUser = async (newUser: IAddUser): Promise<IUser | null> => {
  const existingUser = users.find(user => user.email === newUser.email || user.username === newUser.username);
  if (existingUser) {
    throw new Error('User with the same email or username already exists');
  }

  const id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1; 

  const user: IUser = { id, ...newUser, createdAt: new Date(), updatedAt: new Date() };

  users.push(user);

  return user;
};


export const getUsers = async (page: number = 1, pageSize: number = 10): Promise<IUser[]> => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return users.slice(start, end);
};

export const getUserById = async (id: number): Promise<IUser | undefined> => {
  return users.find(user => user.id === id);
};


export const updateUser = (
  id: number,
  updates: Partial<Omit<IUser, "id">>
): IUser | null => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  users[userIndex] = { ...users[userIndex], ...updates };
  return users[userIndex];
};
export const deleteUser = async (id: number): Promise<boolean> => {
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  return users.length < initialLength;
};
