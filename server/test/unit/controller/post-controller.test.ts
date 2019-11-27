import * as PostApiController from "../../../src/controller/api/post-controller";
import {Post} from "../../../src/entity/Post";
jest.mock( "../../../src/entity/Post");
import {mockRequest, mockResponse} from "mock-req-res";

// https://stackoverflow.com/a/52334169/8226611 참고하여 static method mocking
describe("Test post-controller", () => {
  describe("Test findByChannelId() method", () => {
    test("Channel.findByChannelId() 메소드가 올바른 Post 리스트 반환하는 경우, 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channelId = "123";
      const posts = [{id: 1, contents: "contents_test", imgSrc: "http://localhost"}];
      const request = mockRequest({params: {id: channelId}});
      const response = mockResponse();

      // when
      const findByName = jest.fn();
      findByName.mockReturnValue(posts);
      Post.findByChannelId = findByName.bind(Post);

      await PostApiController.findByChannelId(request, response);

      // then
      expect(findByName).toHaveBeenCalled();
      expect(response.json.args[0][0]).toEqual({message: "ok", payload: { posts: posts }});
    });

    test("Channel.findByChannelId() 메소드가 올바른 Post 리스트 반환하는 경우, 응답 데이터에 포함되어야 한다", async () => {
      // given
      const channelId = "123";
      const posts = [];
      const request = mockRequest({params: {id: channelId}});
      const response = mockResponse();

      // when
      const findByName = jest.fn();
      findByName.mockReturnValue(posts);
      Post.findByChannelId = findByName.bind(Post);

      await PostApiController.findByChannelId(request, response);

      // then
      expect(findByName).toHaveBeenCalled();
      expect(response.json.args[0][0]).toEqual({message: "ok", payload: { posts: posts }});
    });
  });
});