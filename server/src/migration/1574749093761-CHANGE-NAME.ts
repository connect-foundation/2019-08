import { MigrationInterface, QueryRunner } from "typeorm";

export class CHANGENAME1574749093761 implements MigrationInterface {
  name = "CHANGENAME1574749093761";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `room` DROP FOREIGN KEY `FK_852a48541632bfb2004705858a7`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `participate_in` DROP FOREIGN KEY `FK_e6071173fadf8584df5b0463123`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `room` CHANGE `profileId` `creator` int NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `participate_in` CHANGE `profileId` `participant` int NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` DROP FOREIGN KEY `FK_a24972ebd73b106250713dcddd9`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` CHANGE `userId` `userId` int NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `room` ADD CONSTRAINT `FK_86e40e0afb08286884be0e6f38b` FOREIGN KEY (`creator`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `participate_in` ADD CONSTRAINT `FK_d914b8226336ece30658108e80d` FOREIGN KEY (`participant`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `participate_in` DROP FOREIGN KEY `FK_d914b8226336ece30658108e80d`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `room` DROP FOREIGN KEY `FK_86e40e0afb08286884be0e6f38b`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` DROP FOREIGN KEY `FK_a24972ebd73b106250713dcddd9`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` CHANGE `userId` `userId` int NOT NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `participate_in` CHANGE `participantId` `profileId` int NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `room` CHANGE `creatorId` `profileId` int NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `participate_in` ADD CONSTRAINT `FK_e6071173fadf8584df5b0463123` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `room` ADD CONSTRAINT `FK_852a48541632bfb2004705858a7` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
  }
}
