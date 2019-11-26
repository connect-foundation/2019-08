import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDSNUG1574746206264 implements MigrationInterface {
    name = 'ADDSNUG1574746206264'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `snug` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `thumbnail` tinyint NULL, `description` tinyint NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD `snugId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `room` ADD `snugId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_f9f76d1aa45cde8b687d9592aa6` FOREIGN KEY (`snugId`) REFERENCES `snug`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `room` ADD CONSTRAINT `FK_3e828c113f00fcf6aac1b338935` FOREIGN KEY (`snugId`) REFERENCES `snug`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `room` DROP FOREIGN KEY `FK_3e828c113f00fcf6aac1b338935`", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_f9f76d1aa45cde8b687d9592aa6`", undefined);
        await queryRunner.query("ALTER TABLE `room` DROP COLUMN `snugId`", undefined);
        await queryRunner.query("ALTER TABLE `profile` DROP COLUMN `snugId`", undefined);
        await queryRunner.query("DROP TABLE `snug`", undefined);
    }

}
