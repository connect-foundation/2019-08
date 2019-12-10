enum StatusCode {
  CREATED = 201,
  OK = 200,
  ACCEPTED = 202
}

export class StatusCodes {
  public static isOk(code: number): boolean {
    return StatusCode.OK === code;
  }

  public static isCreated(code: number): boolean {
    return StatusCode.CREATED === code;
  }

  public static isAccepted(code: number): boolean {
    return StatusCode.ACCEPTED === code;
  }
}