export enum StorageType {
  LOCAL = "local",
  SESSION = "session"
}

export class BrowserStorageHelper {
  private storageType: StorageType;
  private storage: Storage;

  constructor(storageType: StorageType) {
    this.storageType = storageType;
    this.storage = this.setStorage(this.storageType);
  }

  setStorage(storageType: StorageType) {
    switch (storageType) {
      case StorageType.LOCAL:
        return localStorage;
      case StorageType.SESSION:
        return sessionStorage;
      default:
        throw new Error("존재하지 않는 스토리지 입니다.");
    }
  }
}
