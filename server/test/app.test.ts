import "dotenv/config";
import "reflect-metadata";
import {createConnection, Connection} from "typeorm";

describe("Test TypeORM SetUp", () => {
    describe("local 환경에서 DB 커넥션이 수립되야만 한다.", () => {
        test("test", (done) => {
            // given
            process.env.PROFILE = "local";

            // when
            createConnection()
                    .then((connection: Connection) => {
                      // then
                        expect(connection).not.toBeNull();
                        expect(connection.isConnected).toBeTruthy();
                        done();

                    })
                    .catch((error: Error) => { throw error; });

        });

    });

});