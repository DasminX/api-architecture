import { User, UserFields } from "../model/User";

export interface UserRespositoryI {
  createUser(fields: UserFields): User;
  getUsers(): User[];
  getUserById(id: string): User | null;
}
