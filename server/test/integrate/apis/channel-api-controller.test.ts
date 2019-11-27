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

    test("should return response has identical channel, 200 status code", runInTransaction(async () => {
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

    test("should return response has empty object, 404 status code", runInTransaction(async () => {
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

    test("should return response has created channel, 201 status code", runInTransaction( async () => {
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

    test("should return response has empty object, 409 status code", runInTransaction(async () => {
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
                message: "given channel name already exists", payload: {}
              });
    }));
  });
});