import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDPROFILE1574745011724 implements MigrationInterface {
    name = 'ADDPROFILE1574745011724'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `profile` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `thumbnail` varchar(255) NULL, `description` varchar(255) NULL, `role` enum ('admin', 'member') NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `profile`", undefined);
    }

}
