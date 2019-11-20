import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDCHANNEL1574194015940 implements MigrationInterface {
  name = "ADDCHANNEL1574194015940";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("CREATE TABLE `channel` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `privacy` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE `channel`", undefined);
  }
}