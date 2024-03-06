import { ExpressHandlerType } from "../../_shared/types";
import { UserServiceI } from "../service/abstraction";

export abstract class UserControllerI {
  protected readonly userService: UserServiceI;

  constructor({ userService }: { userService: UserServiceI }) {
    this.userService = userService;
  }

  public abstract createUser: ExpressHandlerType;
  public abstract getUsers: ExpressHandlerType;
  public abstract getUserById: ExpressHandlerType;
}
