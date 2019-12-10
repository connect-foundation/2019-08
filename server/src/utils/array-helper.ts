export const isLongerThan = (array: object[], expected: number): boolean => {
  return array && array.length > expected;
};

export const isNotEmpty = (array: object[]): boolean => {
  return isLongerThan(array, 0);
};