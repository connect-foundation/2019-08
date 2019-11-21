import { AxiosError } from "axios";

export class AxiosErrorHandler {
  public static handleError(error: AxiosError, message: string): boolean {
    if (error.response) {
      return false;
    } else {
      console.error(error.message);
      throw new Error(message);
    }
  }
}
