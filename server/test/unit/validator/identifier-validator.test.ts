import * as Identifier from "../../../src/validator/identifier-validator";
import {mockRequest, mockResponse} from "mock-req-res";

describe("Test identifier-validator", () => {
  describe("Test isOutOfRangeChar() method", () => {
    test("0 ~ 9 범위를 벗어난 10 경우, true 를 반환해야 한다", () => {
      expect(Identifier.isOutOfRangeChar("10")).toBeTruthy();
    });
    test("0 ~ 9 범위를 벗어난 -1 경우, true 를 반환해야 한다", () => {
      expect(Identifier.isOutOfRangeChar("-1")).toBeTruthy();
    });
    test("0 ~ 9 범위에 포함된 경우, false 를 반환해야 한다", () => {
      for (let num = 0; num < 10; ++num) {
        expect(Identifier.isOutOfRangeChar(num.toString())).toBeFalsy();
      }
    });
  });

  describe("Test hasNotEveryNumber() method", () => {
    test("문자열이 모두 숫자만 포함한 경우, true 를 반환해야 한다", () => {
      expect(Identifier.hasNotEveryNumber("123456789")).toBeFalsy();
    });
    test("음수는 '-' 문자를 포함하기 때문에 경우, true 를 반환해야 한다", () => {
      expect(Identifier.hasNotEveryNumber("-1")).toBeTruthy();
    });
    test("문자열이 숫자 외 문자를 포함한 경우, false 를 반환해야 한다", () => {
      expect(Identifier.hasNotEveryNumber("123helloworld123")).toBeTruthy();
    });
  });

  describe("Test hasNotValue() method", () => {
    test("null 이 입력된 경우, true 를 반환해야 한다", () => {
      expect(Identifier.hasNotValue(null)).toBeTruthy();
    });
    test("undefined 이 입력된 경우, true 를 반환해야 한다", () => {
      expect(Identifier.hasNotValue(undefined)).toBeTruthy();
    });
    test("빈 문자열이 입력된 경우, true 를 반환해야 한다", () => {
      expect(Identifier.hasNotValue("")).toBeTruthy();
    });
    test("문자열이 입력된 경우, false 를 반환해야 한다", () => {
      expect(Identifier.hasNotValue("123")).toBeFalsy();
    });
  });

  describe("Test isOutOfRange() method", () => {
    test("(0 ~ 2^31 - 1) 범위에 포함된 문자열이 입력된 경우, false 를 반환해야 한다.", () => {
      expect(Identifier.isOutOfRange("1")).toBeFalsy();
      expect(Identifier.isOutOfRange((Math.pow(2, 31) - 1).toString())).toBeFalsy();
    });
    test("음수 관한 문자열이 입력된 경우, true 를 반환해야 한다.", () => {
      expect(Identifier.isOutOfRange("-1")).toBeTruthy();
    });
    test("0 이 입력된 경우, true 를 반환해야 한다.", () => {
      expect(Identifier.isOutOfRange("0")).toBeTruthy();
    });
    test("(2^31 - 1) 이상의 문자열이 입력된 경우, true 를 반환해야 한다.", () => {
      expect(Identifier.isOutOfRange(Math.pow(2, 31).toString())).toBeTruthy();
      expect(Identifier.isOutOfRange(Number.MAX_SAFE_INTEGER.toString())).toBeTruthy();
    });
  });

  describe("Test isNumeric() method", () => {
    test("유효한 id 가 입력된 경우, 오류를 포함하지 않은 next() 메소드가 호출되는지 검증한다", () => {
      // given
      const id = "123";
      const next = jest.fn().mockImplementation(() => {});
      const request = mockRequest({params: {id: id}});
      const response = mockResponse();

      // when, then
      Identifier.isNumeric(request, response, next, id);
      expect(next).toHaveBeenCalledWith();
    });

    test("숫자 외 문자를 포함한 id 가 입력된 경우, 오류를 포함한 next() 메소드가 호출되는지 검증한다", () => {
      // given
      const id = "123sung";
      const next = jest.fn().mockImplementation(() => {});
      const request = mockRequest({params: {id: id}});
      const response = mockResponse();

      // when, then
      Identifier.isNumeric(request, response, next, id);
      expect(next).toHaveBeenCalledWith("Invalid id format. Must be an Number");
    });

    test("빈 문자열의 id 가 입력된 경우, 오류를 포함한 next() 메소드가 호출되는지 검증한다", () => {
      // given
      const id = "";
      const next = jest.fn().mockImplementation(() => {});
      const request = mockRequest({params: {id: id}});
      const response = mockResponse();

      // when, then
      Identifier.isNumeric(request, response, next, id);
      expect(next).toHaveBeenCalledWith("Invalid id format. Must be an Number");
    });
  });
});