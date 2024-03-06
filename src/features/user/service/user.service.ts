import { UserFields, User } from "../model/User";
import { UserServiceI } from "./abstraction";

export class UserService implements UserServiceI {
  async createUser(fields: UserFields): Promise<User> {
    return new User({ name: "a", surname: "b", age: 33, email: "d@op.pl" });
    // return new User(fields);
  }
  async getUserById(id: string): Promise<User | null> {
    return null;
  }
  async getUsers(): Promise<User[]> {
    return [new User({ name: "a", surname: "b", age: 33, email: "d@op.pl" })];
  }
}
