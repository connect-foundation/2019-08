import {MigrationInterface, QueryRunner} from "typeorm";

export class CHANGEPOSTTOMATERIALIZEDPATH1576297891945 implements MigrationInterface {
    name = 'CHANGEPOSTTOMATERIALIZEDPATH1576297891945'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_536cdbad512a2fd8bd7b9970b35`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `parentCategoryId`", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `mpath` varchar(255) NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `parentId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_985731f28966e0d45a7bd9078a6` FOREIGN KEY (`parentId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_985731f28966e0d45a7bd9078a6`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `parentId`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `mpath`", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `parentCategoryId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_536cdbad512a2fd8bd7b9970b35` FOREIGN KEY (`parentCategoryId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
