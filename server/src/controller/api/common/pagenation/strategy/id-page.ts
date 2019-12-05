import {Page} from "./page";
import {Purifier} from "./util/purifier";
import {LessThan} from "typeorm";

/**
 *
 * ID 기준으로 Pagination 지원하는 전략
 *
 */
export class IdPage implements Page {
  private static readonly DEFAULT_ID = 1;
  private static readonly DEFAULT_SIZE = 15;
  private static readonly MINIMUM_ID = 1;
  private static readonly MINIMUM_SIZE = 1;
  private readonly id: number;
  private readonly size: number;

  constructor(id: number, size: number) {
    this.id = Purifier.refine(id, IdPage.MINIMUM_ID, IdPage.DEFAULT_ID);
    this.size = Purifier.refine(size, IdPage.MINIMUM_SIZE, IdPage.DEFAULT_SIZE);
  }

  /**
   *
   * ID 보다 작은 데이터 기준으로 take 만큼 조회
   *
   */
  support(): object {
    return {
      take: this.size,
      where: {id: LessThan(this.id)}
    };
  }
}