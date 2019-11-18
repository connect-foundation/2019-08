export class StringHelper {
  private readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  static from(origin: StringHelper) {
    return new StringHelper(origin.text);
  }

  lessThan(expected: number) {
    return this.text.length < expected;
  }

  moreThan(expected: number) {
    return this.text.length > expected;
  }

  getValue() {
    return this.text;
  }

  is(object: object) {
    const {text} = object as StringHelper;
    return Object.is(text, this.text);
  }
}