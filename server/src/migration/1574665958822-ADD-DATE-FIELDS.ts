import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDDATEFIELDS1574665958822 implements MigrationInterface {
    name = "ADDDATEFIELDS1574665958822";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `channel` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `createdAt`", undefined);
    }

}
