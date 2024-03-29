import { UserFields, User } from "../model/User.mock";
import { UserServiceI, UserServiceIDeps } from "./abstraction";

export class UserService extends UserServiceI {
  constructor({ userRepository }: UserServiceIDeps) {
    super({ userRepository });
  }

  async createUser(fields: UserFields): Promise<User> {
    return await this.userRepository.createUser(fields);
  }

  async getUserById(id: string): Promise<User | null> {
    return (await this.userRepository.getUserById(id)) ?? null;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }
}
