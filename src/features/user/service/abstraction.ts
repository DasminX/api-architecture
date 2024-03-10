import { User, UserFields } from "../model/User";
import { UserRespositoryI } from "../repository/abstraction";

export abstract class UserServiceI {
  protected readonly userRepository: UserRespositoryI;

  constructor({ userRepository }: { userRepository: UserRespositoryI }) {
    this.userRepository = userRepository;
  }

  abstract createUser(fields: UserFields): Promise<User>;
  abstract getUsers(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User | null>;
}
