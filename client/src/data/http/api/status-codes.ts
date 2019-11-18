enum StatusCode {
  CREATED = 201,
  OK = 200
}

export class StatusCodes {
  public static isOk(code: number): boolean {
    return StatusCode.OK === code;
  }

  public static isCreated(code: number): boolean {
    return StatusCode.CREATED === code;
  }
}