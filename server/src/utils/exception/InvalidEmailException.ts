export default class InvalidEmailException extends Error {
  constructor(message: string) {
    super(message);
  }
}
