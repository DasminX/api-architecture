import express, { Router } from "express";
import { UserControllerI } from "../controller/abstraction";
import { ExpressHandlerType } from "../../_shared/types";

type UserRouteDeps = {
  userController: UserControllerI;
  createUserSchemaValidator: ExpressHandlerType;
};

export class UserRoute {
  public readonly router: Router;
  private readonly userController: UserControllerI;
  private readonly createUserSchemaValidator: ExpressHandlerType;

  constructor({ userController, createUserSchemaValidator }: UserRouteDeps) {
    this.userController = userController;
    this.createUserSchemaValidator = createUserSchemaValidator;

    this.router = express.Router();
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this.router.post(
      "/",
      this.createUserSchemaValidator,
      this.userController.createUser
    );
    this.router.get("/", this.userController.getUsers);
    this.router.get("/:id", this.userController.getUserById);
  }
}
