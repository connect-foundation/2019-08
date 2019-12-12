import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDINVITE1575540485123 implements MigrationInterface {
  name = "ADDINVITE1575540485123";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `room` DROP FOREIGN KEY `FK_86e40e0afb08286884be0e6f38c`", undefined);
    await queryRunner.query("ALTER TABLE `participate_in` DROP FOREIGN KEY `FK_d914b8226336ece30658108e80e`", undefined);
    await queryRunner.query("ALTER TABLE `room` CHANGE `creator` `creatorId` int NULL", undefined);
    await queryRunner.query("ALTER TABLE `participate_in` CHANGE `participant` `participantId` int NULL", undefined);
    await queryRunner.query("CREATE TABLE `invite` (`createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `ticket` varchar(36) NOT NULL, `userId` int NULL, `snugId` int NULL, `emailLocalpart` varchar(64) NOT NULL, `emailDomain` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`", undefined);
    await queryRunner.query("ALTER TABLE `user` ADD `emailLocalpart` varchar(64) NOT NULL", undefined);
    await queryRunner.query("ALTER TABLE `user` ADD `emailDomain` varchar(255) NOT NULL", undefined);
    await queryRunner.query("ALTER TABLE `invite` ADD CONSTRAINT `FK_91bfeec7a9574f458e5b592472d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    await queryRunner.query("ALTER TABLE `invite` ADD CONSTRAINT `FK_e506ff62d7f2a270bd7803b04c5` FOREIGN KEY (`snugId`) REFERENCES `snug`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    await queryRunner.query("ALTER TABLE `room` ADD CONSTRAINT `FK_86e40e0afb08286884be0e6f38b` FOREIGN KEY (`creatorId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    await queryRunner.query("ALTER TABLE `participate_in` ADD CONSTRAINT `FK_d914b8226336ece30658108e80d` FOREIGN KEY (`participantId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `participate_in` DROP FOREIGN KEY `FK_d914b8226336ece30658108e80d`", undefined);
    await queryRunner.query("ALTER TABLE `room` DROP FOREIGN KEY `FK_86e40e0afb08286884be0e6f38b`", undefined);
    await queryRunner.query("ALTER TABLE `invite` DROP FOREIGN KEY `FK_e506ff62d7f2a270bd7803b04c5`", undefined);
    await queryRunner.query("ALTER TABLE `invite` DROP FOREIGN KEY `FK_91bfeec7a9574f458e5b592472d`", undefined);
    await queryRunner.query("ALTER TABLE `user` DROP COLUMN `emailDomain`", undefined);
    await queryRunner.query("ALTER TABLE `user` DROP COLUMN `emailLocalpart`", undefined);
    await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL", undefined);
    await queryRunner.query("DROP TABLE `invite`", undefined);
    await queryRunner.query("ALTER TABLE `participate_in` CHANGE `participantId` `participant` int NULL", undefined);
    await queryRunner.query("ALTER TABLE `room` CHANGE `creatorId` `creator` int NULL", undefined);
    await queryRunner.query("ALTER TABLE `participate_in` ADD CONSTRAINT `FK_d914b8226336ece30658108e80e` FOREIGN KEY (`participant`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    await queryRunner.query("ALTER TABLE `room` ADD CONSTRAINT `FK_86e40e0afb08286884be0e6f38c` FOREIGN KEY (`creator`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
  }
}
