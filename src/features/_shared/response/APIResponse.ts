export class APIResponseSuccess {
  public readonly ok = true;

  constructor(public readonly data: unknown) {}
}

export class APIResponseFail {
  public readonly ok = false;

  constructor(public readonly error: unknown) {}
}
