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
