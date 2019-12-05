import request from "supertest";
import {SuperTest, Test} from "supertest";
import Application from "../../../../src/app";
import {Room} from "../../../../src/domain/entity/Room";
import {runInTransaction, initialiseTestTransactions} from "typeorm-test-transactions";
import {Post} from "../../../../src/domain/entity/Post";
import {FOUND_CHANNEL} from "../../../../src/controller/api/common/error-message";

initialiseTestTransactions();

// Test 필요한 Posts Generator
const createPosts = (count: number, room: Room) => {
  const posts = [];
  for(let num = 1; num <= count; ++num) {
    posts.push({
      contents: "snug" + num,
      imgSrc: "helloworld" + num,
      room: room
    } as Post);
  }

  return posts;
};

const parsePost = (post: Post) => {
  return {
    id: post.id,
    contents: post.contents,
    imgSrc: post.imgSrc,
    profile: null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString()
  };
};

const parsePosts = (posts: Post[]) => {
  return posts.map(parsePost);
};

describe("Test /api/channels", () => {
  describe("Test GET /:id/posts", () => {
    let app: SuperTest<Test>;

    beforeAll(done => {
      Application.start()
              .then(apps => {
                app = request(apps);
                done();
              });
    });

    afterAll(async done => {
      await Application.getEntityManager().connection.close();
      done();
    });

    test("올바른 id 로 요청을 보낸 경우, 주어진 posts 와 동일해야 하며 200 status code 로 응답해야 한다", runInTransaction(async () => {
      // given
      const channel = await Room.create({
        title: "snug",
        description: "hello world",
        isPrivate: true,
        isChannel: true
      }).save();

      const posts = await Post.save(createPosts(3, channel));
      const expected = parsePosts(posts);

      // when, then
      await app.get("/api/channels/" + channel.id + "/posts")
              .expect("Content-Type", /json/)
              .expect(200)
              .expect({ message: FOUND_CHANNEL, payload: { posts: expected} });
    }));

    test("숫자 외 문자가 포함된 id 로 요청한 경우, 500 status code 로 응답해야 한다", runInTransaction(async () => {
      // given
      const wrongId = "12temp";

      // when, then
      await app.get("/api/channels/" + wrongId + "/posts")
              .expect(500);
    }));

    test("(2^31 - 1) 길이 보다 긴 id 로 요청한 경우, 500 status code 로 응답해야 한다", runInTransaction(async () => {
      // given
      const wrongId = "12345678912345678912";

      // when, then
      await app.get("/api/channels/" + wrongId + "/posts")
              .expect(500);
    }));
  });
});