import HttpHelper from "./http-helper";

export default class UrlInfo {

  static aboutRegister(): string {
    const clientHome = UrlInfo.aboutHome();
    return `${clientHome}/register-user`;
  };

  static aboutApiVerification(ticket: string): string {
    return `/api/invite/${ticket}`;
  }

  static aboutVerification(ticket: string): string {
    const serverDomain = UrlInfo.aboutServerDomain();
    return `${serverDomain}/invite/${ticket}`;
  }

  static aboutSnugById(snugId: number): string {
    const clientHome = UrlInfo.aboutHome();
    return `${clientHome}/snug/${snugId}/channel/0`;
  }

  static aboutHome(): string {
    const scheme = UrlInfo.getScheme();
    return `${scheme}://${process.env.CLIENT_DOMAIN}`;
  }

  static aboutServerDomain(): string {
    const scheme = UrlInfo.getScheme();
    return `${scheme}://${process.env.SERVER_DOMAIN}`;
  }

  static getScheme(): string {
    return HttpHelper.isSupportedHttps() ? "https" : "http";
  }
}