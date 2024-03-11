import { ExpressHandlerType } from "../../_shared/types";
import { UserServiceI } from "../service/abstraction";

export type UserControllerIDeps = { userService: UserServiceI };

export abstract class UserControllerI {
  protected readonly userService: UserServiceI;

  constructor({ userService }: UserControllerIDeps) {
    this.userService = userService;
  }

  public abstract createUser: ExpressHandlerType;
  public abstract getUsers: ExpressHandlerType;
  public abstract getUserById: ExpressHandlerType;
}
