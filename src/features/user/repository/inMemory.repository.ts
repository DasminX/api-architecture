import { UserFields, User } from "../model/User";
import { UserRespositoryI } from "./abstraction";

export class InMemoryUserRepository implements UserRespositoryI {
  private readonly users: User[] = [];

  createUser(fields: UserFields): User {
    const newUser = new User(fields);
    this.users.push(newUser);

    return newUser;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | null {
    const searchedUser = this.users.find((user) => user.id === id);

    return searchedUser ?? null;
  }
}
