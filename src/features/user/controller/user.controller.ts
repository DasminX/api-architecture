import { Request, Response, NextFunction } from "express-serve-static-core";
import { ExpressHandlerType } from "../../_shared/types";
import { UserControllerI } from "./abstraction";
import { UserServiceI } from "../service/abstraction";
import { APIResponseSuccess } from "../../_shared/response/APIResponse";

export class UserController extends UserControllerI {
  constructor({ userService }: { userService: UserServiceI }) {
    super({ userService });
  }

  public createUser: ExpressHandlerType = async (req, res, next) => {
    const newUser = await this.userService.createUser(req.body);
    res.json(new APIResponseSuccess(newUser));
  };

  public getUsers: ExpressHandlerType = async (req, res, next) => {
    const users = await this.userService.getUsers();
    console.log(users);
    res.json(new APIResponseSuccess(users));
  };

  public getUserById: ExpressHandlerType = async (req, res, next) => {
    const user = await this.userService.getUserById(req.params.id ?? "no-id");
    res.json(new APIResponseSuccess(user));
  };
}
