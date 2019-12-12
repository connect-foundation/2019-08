export function getCookie(cookieName: string) {
  const search = cookieName + "=";
  const cookie = document.cookie;
  if (cookie.length <= 0) return false;
  let startIndex = cookie.indexOf(search);
  if (startIndex == -1) return false;
  startIndex += search.length;
  let endIndex = cookie.indexOf(";", startIndex);
  if (endIndex == -1) endIndex = cookie.length;
  return unescape(cookie.substring(startIndex, endIndex));
}

// 참고 출처 : https://caronjuni.tistory.com/entry/documentcookie%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C

export const hasCookie = (cookieName: string) => {
  return document.cookie === cookieName;
};
