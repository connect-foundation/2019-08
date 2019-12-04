export enum StorageType {
  LOCAL = "local",
  SESSION = "session"
}

export type BrowserStorageKey = string;

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

  get(key: BrowserStorageKey) {
    return this.storage.getItem(key);
  }

  set(key: BrowserStorageKey, target: string) {
    this.storage.setItem(key, target);
  }

  clear(key: BrowserStorageKey) {
    this.storage.removeItem(key);
  }
}
