import * as ChannelApiController from "../../../src/controller/api/channel-controller";
import {Room} from "../../../src/entity/Room";
import {FOUND_CHANNEL, NOT_FOUND_CHANNEL} from "../../../src/controller/api/common/error-message";

jest.mock( "../../../src/entity/Room");
import {mockRequest, mockResponse} from "mock-req-res";

// https://stackoverflow.com/a/52334169/8226611 참고하여 static method mocking
describe("Test channel-controller", () => {
  describe("Test find() method", () => {
    test("Room.findByTitle() 메소드가 올바른 Room 반환하는 경우, 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channel = {id: 11, title: "channelTitle", description: "hello world", isPrivate: true, isChannel: true};
      const title = "snug_test";
      const request = mockRequest({params: {title: title}});
      const response = mockResponse();

      // when
      const findByTitle = jest.fn();
      findByTitle.mockReturnValue(channel);
      Room.findByTitle = findByTitle.bind(Room);

      await ChannelApiController.find(request, response);

      // then
      expect(findByTitle).toHaveBeenCalledWith(title);
      expect(response.json.args[0][0]).toEqual({message: FOUND_CHANNEL, payload: channel});
    });

    test("Room.findByTitle() 메소드가 빈 Room 반환하는 경우, Empty Object 가 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channel = {};
      const title = "snug_test";
      const request = mockRequest({params: {title: title}});
      const response = mockResponse();

      // when
      const findByTitle = jest.fn();
      findByTitle.mockReturnValue(channel);
      Room.findByTitle = findByTitle.bind(Room);

      await ChannelApiController.find(request, response);

      // then
      expect(findByTitle).toHaveBeenCalledWith(title);
      expect(response.json.args[0][0]).toEqual({message: FOUND_CHANNEL, payload: channel});
    });

    test("Room.findByTitle() 메소드가 null 반환하는 경우, Empty Object 가 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channel = null;
      const title = "snug_test";
      const request = mockRequest({params: {title: title}});
      const response = mockResponse();

      // when
      const findByTitle = jest.fn();
      findByTitle.mockReturnValue(channel);
      Room.findByTitle = findByTitle.bind(Room);

      await ChannelApiController.find(request, response);

      // then
      expect(findByTitle).toHaveBeenCalledWith(title);
      expect(response.json.args[0][0]).toEqual({message: NOT_FOUND_CHANNEL, payload: {}});
    });

    test("Room.findByTitle() 메소드가 undefined 반환하는 경우, Empty Object 가 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channel = undefined;
      const title = "snug_test";
      const request = mockRequest({params: {title: title}});
      const response = mockResponse();

      // when
      const findByTitle = jest.fn();
      findByTitle.mockReturnValue(channel);
      Room.findByTitle = findByTitle.bind(Room);

      await ChannelApiController.find(request, response);

      // then
      expect(findByTitle).toHaveBeenCalledWith(title);
      expect(response.json.args[0][0]).toEqual({message: NOT_FOUND_CHANNEL, payload: {}});
    });
  });
});