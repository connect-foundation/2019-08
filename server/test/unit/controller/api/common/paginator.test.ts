import {Paginator} from "../../../../../src/controller/api/common/paginator";

describe("Test Paginator", () => {
  describe("Test support() method", () => {
    const [defaultPage, defaultSize] = Paginator.getDefaultValues();
    test("올바른 page, size 입력한 경우, 테스트를 통과해야 한다", () => {
      const pageable = new Paginator({page: 3, size: 2});
      expect(pageable.addOrder("", "").support()).toEqual({skip: 3, take: 2, order: {}});
    });

    test("size 가 null 인 경우, take 는 default 값으로 설정되어야 한다", () => {
      const pageable = new Paginator({page: 3, size: null});
      expect(pageable.addOrder("", "").support()).toEqual({skip: 3, take: defaultSize, order: {}});
    });

    test("page 가 null 인 경우, skip 는 default 값으로 설정되어야 한다", () => {
      const pageable = new Paginator({page: null, size: 2});
      expect(pageable.addOrder("", "").support()).toEqual({skip: defaultPage, take: 2, order: {}});
    });

    test("page, size 모두 null 인 경우, take & skip 모두 default 값으로 설정되어야 한다", () => {
      const pageable = new Paginator({page: null, size: null});
      expect(pageable.addOrder("", "").support()).toEqual({skip: defaultPage, take: defaultSize, order: {}});
    });

    test("order value 에 빈 문자열이 입력된 경우, default 인 ASC 가 설정되어야 한다", () => {
      const pageable = new Paginator({page: 3, size: 2});
      expect(pageable.addOrder("id", "").support()).toEqual({skip: 3, take: 2, order: {id: "ASC"}});
    });

    test("order 의 value 를 ASC 로 입력한 경우, ASC 가 설정되어야 한다", () => {
      const pageable = new Paginator({page: 3, size: 2});
      expect(pageable.addOrder("id", "ASC").support()).toEqual({skip: 3, take: 2, order: {id: "ASC"}});
    });

    test("order 의 value 를 DESC 로 입력한 경우, DESC 가 설정되어야 한다", () => {
      const pageable = new Paginator({page: 3, size: 2});
      expect(pageable.addOrder("id", "DESC").support()).toEqual({skip: 3, take: 2, order: {id: "DESC"}});
    });

    test("order 에 동일한 key 대해 다른 value 가 입력된 경우, 첫 번째로 설정된 value 가 설정되어야 한다", () => {
      const pageable = new Paginator({page: 3, size: 2});
      expect(pageable.addOrder("id", "DESC").addOrder("id", "ASC").support()).toEqual({skip: 3, take: 2, order: {id: "DESC"}});
    });

    test("order 에 여러 가지의 정렬 조건이 입력된 경우, 모두 결과에 포함되어야 한다", () => {
      const pageable = new Paginator({page: 3, size: 2});
      expect(pageable.addOrder("id", "DESC").addOrder("name", "ASC").support()).toEqual({skip: 3, take: 2, order: {id: "DESC", name: "ASC"}});
    });
  });
});