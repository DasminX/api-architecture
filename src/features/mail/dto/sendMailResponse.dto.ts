type IncomingUnknownErrorType = Error | string | unknown;

export class SendMailResponseSuccessDto {
  public readonly delivered = true;
  public readonly timestamp = Date.now();
}

export class SendMailResponseFailDto {
  public readonly delivered = false;
  public readonly errorMessage: string;

  constructor(_error: IncomingUnknownErrorType) {
    this.errorMessage = this._getErrorMessage(_error);
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

export type SendMailResponseDto = SendMailResponseSuccessDto | SendMailResponseFailDto;
