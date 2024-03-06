import { Request, Response, NextFunction } from "express-serve-static-core";
import { ExpressHandlerType } from "../../_shared/types";
import { UserControllerI } from "./abstraction";
import { UserServiceI } from "../service/abstraction";

export class UserController extends UserControllerI {
  constructor({ userService }: { userService: UserServiceI }) {
    super({ userService });
  }

  public createUser: ExpressHandlerType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const newUser = await this.userService.createUser(req.body);
    console.log(newUser);
    res.json({ data: newUser });
  };

  public getUsers: ExpressHandlerType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const users = await this.userService.getUsers();
    console.log(users);
    res.json({ data: users });
  };

  public getUserById: ExpressHandlerType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = await this.userService.getUserById("1");
    console.log(user);
    res.json({ data: user });
  };
}
