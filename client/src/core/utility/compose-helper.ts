// 그룹 프로젝트 수업 자료 참고
export const pipe = (...functions: any) => (...args: any) => functions.reduce((arg: any, nextFunction: any) => {
  if (Array.isArray(arg)) {
    return nextFunction(...arg);
  }
  return nextFunction(arg);
}, args);