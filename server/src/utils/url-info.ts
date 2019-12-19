export default class UrlInfo {
  static aboutRegister(): string {
    return `${process.env.CLIENT_DOMAIN}/register-user`;
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

  static aboutServerDomain(): string {
    return `${process.env.HOST}:${process.env.PORT}`;
  }

  static aboutHome(): string {
    return process.env.CLIENT_DOMAIN;
  }
}