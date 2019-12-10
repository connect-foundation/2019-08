export default class TransferEmailException extends Error {
  constructor(message: string) {
    super(message);
  }
}