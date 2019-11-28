import {Order} from "./order";

/**
 *
 * TypeORM 의 Pagination 기능을 지원하는 객체
 *
 * */
export class Paginator {
  private static readonly DEFAULT_PAGE = 0;
  private static readonly DEFAULT_SIZE = 15;

  private readonly page: number;
  private readonly size: number;
  private readonly order: Order;

  constructor({page, size}) {
    this.page = page || Paginator.DEFAULT_PAGE;
    this.size = size || Paginator.DEFAULT_SIZE;
    this.order = new Order();
  }

  /**
   *
   * 특정 칼럼에 대한 정렬 조건을 Order 객체에 저장
   *
   * @param key Column
   * @param value SORT (ex, ASC/DESC)
   * @return itself(Pageable)
   *
   * */
  addOrder(key: string, value: string): Paginator {
    this.order.add(key, value);
    return this;
  }

  /**
   *
   * page, size, Order 기반으로 TypeORM 옵션 지원
   *
   * @return TypeORM 옵션인 page, size, order 포함한 Object
   *
   * */
  support(): object {
    return {
      skip: this.page,
      take: this.size,
      ...this.order.support()
    };
  }

  /**
   *
   * page, size 대한 Default 값 제공
   *
   * @return [default page, default, size]
   *
   * */
  static getDefaultValues(): Array<number> {
    return [Paginator.DEFAULT_PAGE, Paginator.DEFAULT_SIZE];
  }
}