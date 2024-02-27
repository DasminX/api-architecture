export enum ErrorsEnum {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
}

export class AppError extends Error {
  public status: "fail" | "error";

  constructor(
    public message: string,
    public statusCode: number,
    public type = ErrorsEnum.UNKNOWN_ERROR
  ) {
    super(message);

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, ErrorsEnum.VALIDATION_ERROR);
  }
}

export class InternalError extends AppError {
  constructor(message: string) {
    super(message, 500, ErrorsEnum.INTERNAL_ERROR);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, ErrorsEnum.NOT_FOUND_ERROR);
  }
}
