export interface BrowserStorageMapper<E> {
  fromJson(json: string): E;
  toJson(E): string;
}
