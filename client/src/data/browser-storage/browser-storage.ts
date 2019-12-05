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

  isNull(value: any) {
    if (value == null) return true;
    return false;
  }

  get(): E | null {
    const value = this.helper.get(this.key);
    if (this.isNull(value)) return null;
    return this.mapper.fromJson(value!);
  }

  set(target: E) {
    const targetValue = this.mapper.toJson(target);
    this.helper.set(this.key, targetValue);
  }

  clear() {
    this.helper.clear(this.key);
  }
}

//참고 : https://medium.com/rainist-engineering/safe-localstorage-using-typescdript-eac147f59ae
