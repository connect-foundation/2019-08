import {Page} from "./page";
import {Purifier} from "./util/purifier";

/**
 *
 * Pagination 기본 전략
 * page, size 기준으로 특정 구간의 데이터를 조회
 *
 */
export class DefaultPage implements Page {
  private static readonly DEFAULT_PAGE = 1;
  private static readonly DEFAULT_SIZE = 15;
  private static readonly MINIMUM_PAGE = 1;
  private static readonly MINIMUM_SIZE = 1;
  private readonly page: number;
  private readonly size: number;

  constructor(page?: number, size?: number) {
    this.page = Purifier.refine(page, DefaultPage.MINIMUM_PAGE, DefaultPage.DEFAULT_PAGE);
    this.size = Purifier.refine(size, DefaultPage.MINIMUM_SIZE, DefaultPage.DEFAULT_SIZE);
  }

  private calculateSkip(page: number, size: number): number {
    return (page - 1) * size;
  }

  support(): object {
    return {
      skip: this.calculateSkip(this.page, this.size),
      take: this.size
    };
  }
}