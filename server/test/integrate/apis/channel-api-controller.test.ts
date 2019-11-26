import * as request from "supertest";
import {SuperTest, Test} from "supertest";
import Application from "../../../src/app";
import {Channel} from "../../../src/entity/Channel";
import {runInTransaction, initialiseTestTransactions} from "typeorm-test-transactions";

initialiseTestTransactions();

describe("/api/channels", () => {
  describe("GET /:names", () => {
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
      const channel = await Channel.create({
        name: "snug",
        description: "hello world",
        privacy: true
      }).save();

      // when, then
      await app.get("/api/channels/" + channel.name)
              .expect("Content-Type", /json/)
              .expect(200)
              .expect({
                message: "ok", payload: {...channel}
              });
    }));

    test("should return response has empty object, 404 status code", runInTransaction(async () => {
      // given
      const channelName = "snug";
      await Channel.delete({
        name: channelName,
        description: "hello world",
        privacy: true
      });

      // when, then
      await app.get("/api/channels/" + channelName)
              .expect("Content-Type", /json/)
              .expect(404)
              .expect({
                message: "not found", payload: {}
              });
    }));
  });
});