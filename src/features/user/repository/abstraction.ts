import { User, UserFields } from "../model/User.mock";

export interface UserRespositoryI {
  createUser(fields: UserFields): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | undefined>;
}
