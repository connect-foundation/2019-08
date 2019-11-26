import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDPOST1574824977117 implements MigrationInterface {
    name = "ADDPOST1574824977117"

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `post` (`createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `contents` text NOT NULL, `imgSrc` varchar(150) NOT NULL, `channelId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_f008dabd69bf5d926240adfbb85` FOREIGN KEY (`channelId`) REFERENCES `channel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_f008dabd69bf5d926240adfbb85`", undefined);
        await queryRunner.query("DROP TABLE `post`", undefined);
        await queryRunner.query("DROP TABLE `channel`", undefined);
    }

}
