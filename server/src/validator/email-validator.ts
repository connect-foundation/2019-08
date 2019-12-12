/**
 *
 * email이 유효한 형식(XXX@XXX.XXX) 검사
 * @param email string
 *
 * */
export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const checkInvalidEmail = (email: string) => {
  return !validateEmail(email);
};

/**
 *
 * password가 8자리 이상 문자열 여부 확인
 * @param string string
 *
 * */

export const validatePasswordLength = (password: string) => {
  return password.length >= 8;
};
