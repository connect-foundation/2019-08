import { MigrationInterface, QueryRunner } from "typeorm";

export class ADDROOM1574745035521 implements MigrationInterface {
  name = "ADDROOM1574745035521";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `room` (`id` int NOT NULL AUTO_INCREMENT,`title` varchar(255) NOT NULL, `description` varchar(255) NULL, `isPrivate` tinyint NOT NULL, `isChannel` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `profileId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `room` ADD CONSTRAINT `FK_852a48541632bfb2004705858a7` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `room` DROP FOREIGN KEY `FK_852a48541632bfb2004705858a7`",
      undefined
    );
    await queryRunner.query("DROP TABLE `room`", undefined);
    await queryRunner.query("DROP TABLE `profile`", undefined);
  }
}
