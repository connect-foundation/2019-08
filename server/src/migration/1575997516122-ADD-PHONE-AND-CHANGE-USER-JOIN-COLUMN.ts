import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDPHONEANDCHANGEUSERJOINCOLUMN1575997516122 implements MigrationInterface {
    name = "ADDPHONEANDCHANGEUSERJOINCOLUMN1575997516122";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_56adaed4f38934440c8a88cd50b`", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `userDomain`", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `userLocalPart`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `phone` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `name`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `name` varchar(64) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `status`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `status` varchar(128) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `thumbnail`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `thumbnail` varchar(256) NULL DEFAULT '/image/default-thumbnail.jpeg'", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `description` varchar(512) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` CHANGE `role` `role` enum ('admin', 'member') NOT NULL DEFAULT 'member'", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_a24972ebd73b106250713dcddd9`", undefined);
        await queryRunner.query("ALTER TABLE `profile` CHANGE `role` `role` enum ('admin', 'member') NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `description` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `thumbnail`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `thumbnail` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `status`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `status` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `name`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `phone`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `userLocalPart` varchar(64) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `userDomain` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_56adaed4f38934440c8a88cd50b` FOREIGN KEY (`userId`, `userLocalPart`, `userDomain`) REFERENCES `user`(`id`,`emailLocalpart`,`emailDomain`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
