export class StringHelper {
  static lessThan(text: string, to: number): boolean {
    return text.length < to;
  }

  static moreThan(text: string, from: number): boolean {
    return text.length > from;
  }

  static isInner(text: string, from: number, to: number): boolean {
    return StringHelper.moreThan(text, from) && StringHelper.lessThan(text, to)
  }
}