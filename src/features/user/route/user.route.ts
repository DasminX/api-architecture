import express, { Router } from "express";
import { UserControllerI } from "../controller/abstraction";
import { ExpressHandlerType } from "../../_shared/types";

type UserRouteDeps = {
  userController: UserControllerI;
  userSchemaValidator: ExpressHandlerType;
};

export class UserRoute {
  public readonly router: Router;
  private readonly userController: UserControllerI;
  private readonly userSchemaValidator: ExpressHandlerType;

  constructor({ userController, userSchemaValidator }: UserRouteDeps) {
    this.userController = userController;
    this.userSchemaValidator = userSchemaValidator;

    this.router = express.Router();
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this.router.post("/", this.userSchemaValidator, this.userController.createUser);
    this.router.get("/", this.userController.getUsers);
    this.router.get("/:id", this.userController.getUserById);
  }
}
