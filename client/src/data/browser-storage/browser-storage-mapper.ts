export interface BrowserStorageMapper<E> {
  fromJson(json: string): E;
  toJson(target: E): string;
}

//참고 : https://medium.com/rainist-engineering/safe-localstorage-using-typescdript-eac147f59ae
