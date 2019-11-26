import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDPARTICIPATEIN1574748267870 implements MigrationInterface {
    name = 'ADDPARTICIPATEIN1574748267870'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `participate_in` (`id` int NOT NULL AUTO_INCREMENT, `profileId` int NULL, `roomId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `participate_in` ADD CONSTRAINT `FK_e6071173fadf8584df5b0463123` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `participate_in` ADD CONSTRAINT `FK_51d995a68f7079b9c89fd1d1c19` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `participate_in` DROP FOREIGN KEY `FK_51d995a68f7079b9c89fd1d1c19`", undefined);
        await queryRunner.query("ALTER TABLE `participate_in` DROP FOREIGN KEY `FK_e6071173fadf8584df5b0463123`", undefined);
        await queryRunner.query("DROP TABLE `participate_in`", undefined);
    }

}
