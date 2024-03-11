import express, { Router } from "express";
import { UserControllerI } from "../controller/abstraction";
import { ExpressHandlerType } from "../../_shared/types";

export class UserRoute {
  public readonly router: Router;
  private readonly userController: UserControllerI;
  private readonly createUserValidator: ExpressHandlerType;

  constructor({
    userController,
    createUserValidator,
  }: {
    userController: UserControllerI;
    createUserValidator: ExpressHandlerType;
  }) {
    this.userController = userController;
    this.createUserValidator = createUserValidator;

    this.router = express.Router();
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this.router.post(
      "/",
      this.createUserValidator,
      this.userController.createUser
    );
    this.router.get("/", this.userController.getUsers);
    this.router.get("/:id", this.userController.getUserById);
  }
}
