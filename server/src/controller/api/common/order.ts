/**
 *
 * 정렬 조건
 *
 * */
enum SORT {
  ASC = "ASC",
  DESC = "DESC"
}

/**
 *
 * Column 대한 SORT 을 정의하는 타입
 *
 *
 * */
type Entry = {
  key: string;
  value: SORT;
}

/**
 *
 * TypeORM 의 order 옵션을 지원하는 객체
 *
 * */
export class Order {
  private entries: Array<Entry>;

  constructor() {
    this.entries = new Array<Entry>();
  }

  /**
   *
   * 특정 칼럼에 대한 정렬 조건을 저장
   *
   * @param key Column
   * @param value SORT (ex, ASC/DESC)
   * @return itself(Order)
   *
   * */
  add(key: string, value: string): Order {
    if(this.has(key)) {
      const sort = SORT[value] || SORT.DESC;
      this.entries.push({key: key, value: sort});
    }

    return this;
  }

  /**
   *
   * value 값이 존재 여부를 확인
   *
   * @param value Column
   * @return 존재 true, 미존재 false
   *
   * */
  private has(value: string): boolean {
    return !!value;
  }

  /**
   *
   * 동일한 key 가 base 에 존재하는 지 확인
   *
   * @param base
   * @param key
   * @return 미존재 true, 존재 false
   *
   * */
  private isNewKey(base: object, key: string): boolean {
    return !Object.keys(base).includes(key);
  }

  /**
   *
   * accumulator 객체에 entry 를 추가
   *
   * @param accumulator
   * @param entry
   * @return accumulator
   *
   * */
  private join(accumulator: object, entry: Entry): object {
    const {key, value} = entry;
    if(this.isNewKey(accumulator, key)) {
      accumulator[key] = value;
    }

    return accumulator;
  }

  /**
   *
   * entries 를 Object 로 파싱하여 TypeORM 옵션을 지원
   *
   * @return order 필드를 가진 Object
   *
   * */
  support(): object {
    return { order: this.entries.reduce(this.join.bind(this), {}) };
  }
}