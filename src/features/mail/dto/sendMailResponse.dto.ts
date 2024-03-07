type IncomingUnknownErrorType = Error | string | unknown;

export class SendMailResponseSuccessDto {
  public readonly success = true;
}

export class SendMailResponseFailDto {
  public readonly success = false;
  public readonly error: string;

  constructor(_error: IncomingUnknownErrorType) {
    this.error = this._getErrorMessage(_error);
  }

  private _getErrorMessage(_error: IncomingUnknownErrorType): string {
    if (_error instanceof Error) {
      return _error.message;
    } else if (typeof _error === "string") {
      return _error;
    } else {
      return "Something went wrong!";
    }
  }
}

export type SendMailResponseDto =
  | SendMailResponseSuccessDto
  | SendMailResponseFailDto;
