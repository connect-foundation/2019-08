import {MigrationInterface, QueryRunner} from "typeorm";

export class CHANGEEMAILASCOMPOSITEKEY1575542819077 implements MigrationInterface {
    name = 'CHANGEEMAILASCOMPOSITEKEY1575542819077'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `invite` DROP FOREIGN KEY `FK_91bfeec7a9574f458e5b592472d`", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_a24972ebd73b106250713dcddd9`", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD `userLocalPart` varchar(64) NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD `userDomain` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `userLocalPart` varchar(64) NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `userDomain` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`, `emailLocalpart`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD PRIMARY KEY (`id`, `emailLocalpart`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `snug` DROP COLUMN `thumbnail`", undefined);
        await queryRunner.query("ALTER TABLE `snug` ADD `thumbnail` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `snug` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `snug` ADD `description` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD CONSTRAINT `FK_9baa86a15b26d03b384e35bc290` FOREIGN KEY (`userId`, `userLocalPart`, `userDomain`) REFERENCES `user`(`id`,`emailLocalpart`,`emailDomain`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_56adaed4f38934440c8a88cd50b` FOREIGN KEY (`userId`, `userLocalPart`, `userDomain`) REFERENCES `user`(`id`,`emailLocalpart`,`emailDomain`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_56adaed4f38934440c8a88cd50b`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP FOREIGN KEY `FK_9baa86a15b26d03b384e35bc290`", undefined);
        await queryRunner.query("ALTER TABLE `snug` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `snug` ADD `description` tinyint NULL", undefined);
        await queryRunner.query("ALTER TABLE `snug` DROP COLUMN `thumbnail`", undefined);
        await queryRunner.query("ALTER TABLE `snug` ADD `thumbnail` tinyint NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD PRIMARY KEY (`id`)", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`)", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `userDomain`", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `userLocalPart`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP COLUMN `userDomain`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP COLUMN `userLocalPart`", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD CONSTRAINT `FK_91bfeec7a9574f458e5b592472d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
