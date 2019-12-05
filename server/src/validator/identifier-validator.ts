export enum Numbers {
  MIN_CHARACTER_DIGIT = 0,
  MAX_CHARACTER_DIGIT = 9,
  MIN_INTEGER_ID = 0,
  MAX_INTEGER_ID = Math.pow(2, 31)
}

/**
 *
 * 한 자리 문자의 0 ~ 9 숫자 범위 포함 여부 확인
 *
 * @param character 0 ~ 9 범위의 한 자리 문자열
 * @return boolean 미포함 true, 포함 false
 *
 * */
export const isOutOfRangeChar = (character: string): boolean => {
  const digit = parseInt(character);
  return !(
    Numbers.MIN_CHARACTER_DIGIT <= digit && digit <= Numbers.MAX_CHARACTER_DIGIT
  );
};

/**
 *
 * 입력받은 문자열이 숫자로만 이루어져 있는 지 확인
 *
 * @param target 문자열
 * @return boolean 모든 문자가 숫자가 아닌 경우 true, 모든 문자가 숫자인 경우 false
 *
 * */
export const hasNotEveryNumber = (target: string): boolean => {
  const DELIMITER = "";
  return target.split(DELIMITER).some(isOutOfRangeChar);
};

/**
 *
 * 빈 문자열, null, undefined 여부 확인
 *
 * @param target 문자열
 * @return boolean 빈 문자열, null, undefined 중 하나인 경우 true, 아닌 경우 false
 *
 * */
export const hasNotValue = (target: string) => {
  return !target;
};

/**
 *
 * 입력받은 문자열의 정수값의 (1 ~ 2^31 - 1) 범위 포함 여부 확인
 *
 * @param target 문자열
 * @return boolean 미포함 true, 포함 false
 *
 * */
export const isOutOfRange = (target: string): boolean => {
  const digits = parseInt(target);
  return !(Numbers.MIN_INTEGER_ID < digits && digits < Numbers.MAX_INTEGER_ID);
};
