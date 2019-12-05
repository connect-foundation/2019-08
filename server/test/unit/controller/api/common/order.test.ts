import {Order} from "../../../../../src/controller/api/common/order";

describe("Test Order", () => {
  describe("Test support() method", () => {
    test("key 가 입력되지 않은 경우, 무시되어야 한다", () => {
      const order = new Order();
      expect(order.add("", "DESC").support()).toEqual({order: {}});
    });

    test("ASC or DESC 가 아닌 값이 value 로 입력된 경우, default 인 DESC 가 설정되어야 한다", () => {
      const order = new Order();
      expect(order.add("first", "wrong_value").support()).toEqual({order: {first: "DESC"}});
    });

    test("ASC 가 value 로 입력된 경우, ASC 가 설정되어야 한다", () => {
      const order = new Order();
      expect(order.add("first", "ASC").support()).toEqual({order: {first: "ASC"}});
    });

    test("DESC 가 value 로 입력된 경우, DESC 가 설정되어야 한다", () => {
      const order = new Order();
      expect(order.add("first", "DESC").support()).toEqual({order: {first: "DESC"}});
    });

    test("동일한 key 대해 다른 value 가 입력된 경우, 첫 번째로 설정된 value 가 설정되어야 한다", () => {
      const order = new Order();
      expect(order.add("first", "ASC").add("first", "DESC").support()).toEqual({order: {first: "ASC"}});
    });

    test("여러 가지의 정렬 조건이 입력된 경우, 모두 결과에 포함되어야 한다", () => {
      const order = new Order();
      expect(order.add("first", "DESC").add("second", "ASC").support()).toEqual({order: {first: "DESC", second: "ASC"}});
    });
  });
});