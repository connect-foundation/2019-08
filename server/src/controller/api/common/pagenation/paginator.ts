import {Order} from "../order";
import {Page} from "./strategy/page";
import {DefaultPage} from "./strategy/default-page";
import _ from "lodash";

/**
 *
 * TypeORM 의 Pagination 기능을 지원하는 객체
 *
 */
export class Paginator {
  private readonly page: Page;
  private readonly order: Order;
  private options: object;

  constructor(page: Page) {
    this.page = page || new DefaultPage();
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
   */
  addOrder(key: string, value: string): Paginator {
    this.order.add(key, value);
    return this;
  }

  /**
   *
   * options, page, Order 기반으로 TypeORM 옵션 지원
   *
   * @return TypeORM 옵션인 page, size, order 포함한 Object
   *
   */
  support(): object {
    return _.merge(this.options, this.page.support(), this.order.support());
  }

  /**
   *
   * 조회시 필요한 조건을 추가
   *
   * @param options 조회 조건
   *
   */
  addOptions(options: object) {
    this.options = _.cloneDeep(options);
  }
}