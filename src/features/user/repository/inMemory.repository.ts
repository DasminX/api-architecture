import { UserFields, User } from "../model/User";
import { UserRespositoryI } from "./abstraction";

export class InMemoryUserRepository implements UserRespositoryI {
  private readonly users: User[] = [];

  async createUser(fields: UserFields): Promise<User> {
    const newUser = new User(fields);
    this.users.push(newUser);

    return newUser;
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
