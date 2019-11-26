import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDPOST1574745189357 implements MigrationInterface {
    name = 'ADDPOST1574745189357'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `contents` varchar(255) NULL, `imgSrc` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `profileId` int NULL, `roomId` int NULL, `parentCategoryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_970844fcd10c2b6df7c1b49eacf` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_451a4a7489ef7889aa6b243c884` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_536cdbad512a2fd8bd7b9970b35` FOREIGN KEY (`parentCategoryId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_536cdbad512a2fd8bd7b9970b35`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_451a4a7489ef7889aa6b243c884`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_970844fcd10c2b6df7c1b49eacf`", undefined);
        await queryRunner.query("DROP TABLE `post`", undefined);
    }

}
