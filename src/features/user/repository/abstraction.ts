import { User, UserFields } from "../model/User";

export interface UserRespositoryI {
  createUser(fields: UserFields): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
}
