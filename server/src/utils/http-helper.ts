export default class HttpHelper {
  static isSupportedHttps = (): boolean => {
    return !!process.env.PRIVATE_KEY && !!process.env.CERT_KEY;
  };

  static isSupportedHttp = (): boolean => {
    return !HttpHelper.isSupportedHttps();
  };
}