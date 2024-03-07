import { Request, Response, NextFunction } from "express-serve-static-core";
import { ExpressHandlerType } from "../../_shared/types";
import { UserControllerI } from "./abstraction";
import { UserServiceI } from "../service/abstraction";

export class UserController extends UserControllerI {
  constructor({ userService }: { userService: UserServiceI }) {
    super({ userService });
  }

  public createUser: ExpressHandlerType = async (req, res, next) => {
    const newUser = await this.userService.createUser(req.body);
    res.json({ data: newUser });
  };

  public getUsers: ExpressHandlerType = async (req, res, next) => {
    const users = await this.userService.getUsers();
    res.json({ data: users });
  };

  public getUserById: ExpressHandlerType = async (req, res, next) => {
    const user = await this.userService.getUserById("1");
    res.json({ data: user });
  };
}
