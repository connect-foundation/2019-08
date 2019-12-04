import { BrowserStorageMapper } from "./browser-storage-mapper";
import {
  BrowserStorageKey,
  BrowserStorageHelper,
  StorageType
} from "./browser-storage-helper";

export class BrowserStorage<E> {
  private key: BrowserStorageKey;
  private mapper: BrowserStorageMapper<E>;
  private helper: BrowserStorageHelper;

  constructor(
    key: BrowserStorageKey,
    mapper: BrowserStorageMapper<E>,
    storageType: StorageType
  ) {
    this.key = key;
    this.mapper = mapper;
    this.helper = new BrowserStorageHelper(storageType);
  }
}
