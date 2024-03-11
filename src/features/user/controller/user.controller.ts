import { ExpressHandlerType } from "../../_shared/types";
import { UserControllerI, UserControllerIDeps } from "./abstraction";
import { APIResponseSuccess } from "../../_shared/response/APIResponse";

export class UserController extends UserControllerI {
  constructor({ userService }: UserControllerIDeps) {
    super({ userService });
  }

  public createUser: ExpressHandlerType = async (req, res, _next) => {
    const newUser = await this.userService.createUser(req.body);
    res.json(new APIResponseSuccess(newUser));
  };

  public getUsers: ExpressHandlerType = async (req, res, _next) => {
    const users = await this.userService.getUsers();
    res.json(new APIResponseSuccess(users));
  };

  public getUserById: ExpressHandlerType = async (req, res, _next) => {
    const user = await this.userService.getUserById(req.params.id ?? "no-id");
    res.json(new APIResponseSuccess(user));
  };
}
