
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddUser {
  name: string;
  username: string;
  email: string;
}
