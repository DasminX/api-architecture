// import { AppError } from "../../../utils/errors";

export class APIResponseSuccess {
  public readonly ok = true;

  constructor(public readonly data: unknown) {}
}

/* export class APIResponseFail {
  public readonly ok = false;
  public readonly reason: unknown = new AppError("Action failed!", 400);
} */
