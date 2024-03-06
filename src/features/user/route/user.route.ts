import express, { Router } from "express";
import { UserControllerI } from "../controller/abstraction";

export class UserRoute {
  public readonly router: Router;
  private readonly userController: UserControllerI;

  constructor({ userController }: { userController: UserControllerI }) {
    this.userController = userController;

    this.router = express.Router();
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this.router.post("/", this.userController.createUser);
    this.router.get("/", this.userController.getUsers);
    this.router.get("/:id", this.userController.getUserById);
  }
}
