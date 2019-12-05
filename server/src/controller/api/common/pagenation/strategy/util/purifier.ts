export class Purifier {
  static isSuitable(target: number, comparer: number): boolean {
    return !target || target < comparer;
  }

  static refine(target: number, comparer: number, substitution: number): number {
    if(this.isSuitable(target, comparer)) {
      return substitution;
    }

    return target;
  }
}