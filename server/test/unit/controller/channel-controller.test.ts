import * as ChannelApiController from "../../../src/controller/api/channel-controller";
import {Channel} from "../../../src/entity/Channel";
jest.mock( "../../../src/entity/Channel");
import {mockRequest, mockResponse} from "mock-req-res";

// https://stackoverflow.com/a/52334169/8226611 참고하여 static method mocking
describe("Test channel-controller", () => {
  describe("Test find() method", () => {
    test("Channel.findByName() 메소드가 올바른 Channel 반환하는 경우, 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channel = {id: 11, name: "channelName", description: "hello world", privacy: true};
      const name = "snug_test";
      const request = mockRequest({params: {name: name}});
      const response = mockResponse();

      // when
      const findByName = jest.fn();
      findByName.mockReturnValue(channel);
      Channel.findByName = findByName.bind(Channel);

      await ChannelApiController.find(request, response);

      // then
      expect(findByName).toHaveBeenCalledWith(name);
      expect(response.json.args[0][0]).toEqual({message: "ok", payload: channel});
    });

    test("Channel.findByName() 메소드가 빈 Channel 반환하는 경우, Empty Object 가 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channel = {};
      const name = "snug_test";
      const request = mockRequest({params: {name: name}});
      const response = mockResponse();

      // when
      const findByName = jest.fn();
      findByName.mockReturnValue(channel);
      Channel.findByName = findByName.bind(Channel);

      await ChannelApiController.find(request, response);

      // then
      expect(findByName).toHaveBeenCalledWith(name);
      expect(response.json.args[0][0]).toEqual({message: "ok", payload: channel});
    });

    test("Channel.findByName() 메소드가 null 반환하는 경우, Empty Object 가 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channel = null;
      const name = "snug_test";
      const request = mockRequest({params: {name: name}});
      const response = mockResponse();

      // when
      const findByName = jest.fn();
      findByName.mockReturnValue(channel);
      Channel.findByName = findByName.bind(Channel);

      await ChannelApiController.find(request, response);

      // then
      expect(findByName).toHaveBeenCalledWith(name);
      expect(response.json.args[0][0]).toEqual({message: "not found", payload: {}});
    });

    test("Channel.findByName() 메소드가 undefined 반환하는 경우, Empty Object 가 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channel = undefined;
      const name = "snug_test";
      const request = mockRequest({params: {name: name}});
      const response = mockResponse();

      // when
      const findByName = jest.fn();
      findByName.mockReturnValue(channel);
      Channel.findByName = findByName.bind(Channel);

      await ChannelApiController.find(request, response);

      // then
      expect(findByName).toHaveBeenCalledWith(name);
      expect(response.json.args[0][0]).toEqual({message: "not found", payload: {}});
    });
  });
});