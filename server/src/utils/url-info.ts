import _ from "lodash";

export default class UrlInfo {
  private static readonly URL_SEPARATOR = "/";
  private static readonly DOMAIN_SEPARATOR = ":";

  static aboutRegister(): string {
    return _.join([process.env.CLIENT_DOMAIN, "register-user"], UrlInfo.URL_SEPARATOR);
  };

  static aboutApiVerification(ticket: string): string {
    return _.join(["/api/invite", ticket], UrlInfo.URL_SEPARATOR);
  }

  static aboutVerification(ticket: string): string {
    const serverDomain = UrlInfo.aboutServerDomain();
    return _.join([serverDomain, "invite", ticket], UrlInfo.URL_SEPARATOR);
  }

  static aboutServerDomain(): string {
    return _.join([process.env.HOST, process.env.PORT], UrlInfo.DOMAIN_SEPARATOR);
  }

  static aboutSnugById(snugId: number): string {
    return _.join([process.env.CLIENT_DOMAIN, "snug", snugId], UrlInfo.URL_SEPARATOR);
  }

  static aboutHome(): string {
    return process.env.CLIENT_DOMAIN;
  }
}