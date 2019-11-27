import request from "supertest";
import {SuperTest, Test} from "supertest";
import Application from "../../../src/app";
import {Room} from "../../../src/entity/Room";
import {runInTransaction, initialiseTestTransactions} from "typeorm-test-transactions";

initialiseTestTransactions();

describe("Test /api/channels", () => {
  describe("Test GET /:title", () => {
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

    test("올바른 title 로 요청을 보낸 경우, 주어진 Channel 와 동일해야 하며 200 status code 로 응답해야 한다", runInTransaction(async () => {
      // given
      const channel = await Room.create({
        title: "snug",
        description: "hello world",
        isPrivate: false,
        isChannel: true,
      }).save();

      // when, then
      await app.get("/api/channels/" + channel.title)
              .expect("Content-Type", /json/)
              .expect(200)
              .expect({
                message: "ok", payload: {
                  ...channel,
                  updatedAt: channel.updatedAt.toISOString(),
                  createdAt: channel.createdAt.toISOString()
                }
              });
    }));

    test("존재하지 않는 title 로 요청을 보낸 경우, 빈 Object 와 동일해야 하며 404 status code 로 응답해야 한다", runInTransaction(async () => {
      // given
      const channelTitle = "snug";

      // when
      await Room.delete({
        title: channelTitle,
        description: "hello world",
        isPrivate: false,
        isChannel: true,
      });

      // then
      await app.get("/api/channels/" + channelTitle)
              .expect("Content-Type", /json/)
              .expect(404)
              .expect({
                message: "not found", payload: {}
              });
    }));
  });

  describe("Test POST /", () => {
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

    test("Request Body 로 전달한 Channel 정보와 생성된 Channel 이 동일해야 하며 201 status code 로 응답해야 한다", runInTransaction( async () => {
      // given
      const channel = {
        title: "snug",
        description: "hello world",
        privacy: false
      };

      // when, then
      await app.post("/api/channels")
              .send(channel)
              .expect("Content-Type", /json/)
              .expect(201)
              .expect((res => {
                const {message, payload} = res.body;
                const {title, description, isPrivate, isChannel} = payload;

                expect(message).toBe("ok");
                expect(title).toBe(channel.title);
                expect(description).toBe(channel.description);
                expect(isPrivate).toBeFalsy();
                expect(isChannel).toBeTruthy();
              }));
    }));

    test("채널 생성을 실패한 경우, 빈 Object 와 동일해야 하며 409 status code 로 응답해야 한다", runInTransaction(async () => {
      // given
      const channel = {
        title: "snug",
        description: "hello world",
        privacy: true
      };

      // when
      await Room.create({
        title: channel.title,
        description: channel.description,
        isPrivate: channel.privacy,
        isChannel: true
      }).save();

      // then
      await app.post("/api/channels")
              .send(channel)
              .expect("Content-Type", /json/)
              .expect(409)
              .expect({
                message: "given channel title already exists", payload: {}
              });
    }));
  });
});