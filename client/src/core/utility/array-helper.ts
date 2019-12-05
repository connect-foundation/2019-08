export class ArrayHelper {
  static generateUntil(limit: number) {
    const array = [];
    for (let num = 0; num < limit; ++num) {
      array.push(num);
    }
    return array;
  };

  static has<T>(array: T[]) {
    return array && array.length > 0;
  };

  static hasNot<T>(array: T[]) {
    return !ArrayHelper.has(array);
  };
}