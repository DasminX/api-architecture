import { User, UserFields } from "../model/User";

export interface UserServiceI {
  createUser(fields: UserFields): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
}
