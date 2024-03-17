import { User, UserFields } from "../model/User.mock";
import { UserRespositoryI } from "../repository/abstraction";

export type UserServiceIDeps = { userRepository: UserRespositoryI };

export abstract class UserServiceI {
  protected readonly userRepository: UserRespositoryI;

  constructor({ userRepository }: UserServiceIDeps) {
    this.userRepository = userRepository;
  }

  abstract createUser(fields: UserFields): Promise<User>;
  abstract getUsers(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User | null>;
}
