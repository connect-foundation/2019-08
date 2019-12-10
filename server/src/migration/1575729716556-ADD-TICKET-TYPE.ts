import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDTICKETTYPE1575729716556 implements MigrationInterface {
    name = "ADDTICKETTYPE1575729716556";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `invite` DROP FOREIGN KEY `FK_9baa86a15b26d03b384e35bc290`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP COLUMN `ticket`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP COLUMN `userDomain`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP COLUMN `userLocalPart`", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD `deletedAt` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD `ticketId` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD CONSTRAINT `FK_91bfeec7a9574f458e5b592472d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `invite` DROP FOREIGN KEY `FK_91bfeec7a9574f458e5b592472d`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP COLUMN `ticketId`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP COLUMN `deletedAt`", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD `userLocalPart` varchar(64) NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD `userDomain` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD `ticket` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD CONSTRAINT `FK_9baa86a15b26d03b384e35bc290` FOREIGN KEY (`userId`, `userLocalPart`, `userDomain`) REFERENCES `user`(`id`,`emailLocalpart`,`emailDomain`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}