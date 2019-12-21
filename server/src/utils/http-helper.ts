import _ from "lodash";

export default class HttpHelper {
  static isSupportedHttps = (): boolean => {
    return _.every([process.env.PRIVATE_KEY, process.env.CERT_KEY, process.env.CA_KEY], HttpHelper.has);
  };

  static has = (key: string): boolean => {
    return !!key && key.length > 0;
  };
}