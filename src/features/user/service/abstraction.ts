import { User, UserFields } from "../model/User";

export interface UserServiceI {
  createUser(fields: UserFields): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserById(id: /* UserFields["id"] */ string): Promise<User | null>;
}
