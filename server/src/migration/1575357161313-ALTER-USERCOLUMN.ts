import {MigrationInterface, QueryRunner} from "typeorm";

export class ALTERUSERCOLUMN1575357161313 implements MigrationInterface {
    name = 'ALTERUSERCOLUMN1575357161313'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `name` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `snug` DROP COLUMN `thumbnail`", undefined);
        await queryRunner.query("ALTER TABLE `snug` ADD `thumbnail` varchar(255) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `snug` DROP COLUMN `thumbnail`", undefined);
        await queryRunner.query("ALTER TABLE `snug` ADD `thumbnail` tinyint NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `name`", undefined);
    }

}
