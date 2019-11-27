import { MigrationInterface, QueryRunner } from "typeorm";

export class ADDUSER1574746492050 implements MigrationInterface {
  name = "ADDUSER1574746492050";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `profile` ADD `userId` int NOT NULL");
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `post` DROP FOREIGN KEY `FK_536cdbad512a2fd8bd7b9970b35`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `post` DROP FOREIGN KEY `FK_451a4a7489ef7889aa6b243c884`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `post` DROP FOREIGN KEY `FK_970844fcd10c2b6df7c1b49eacf`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `room` DROP FOREIGN KEY `FK_3e828c113f00fcf6aac1b338935`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `room` DROP FOREIGN KEY `FK_852a48541632bfb2004705858a7`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` DROP FOREIGN KEY `FK_a24972ebd73b106250713dcddd9`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `profile` DROP FOREIGN KEY `FK_f9f76d1aa45cde8b687d9592aa6`",
      undefined
    );
    await queryRunner.query("DROP TABLE `post`", undefined);
    await queryRunner.query("DROP TABLE `room`", undefined);
    await queryRunner.query("DROP TABLE `profile`", undefined);
    await queryRunner.query("DROP TABLE `user`", undefined);
    await queryRunner.query("DROP TABLE `snug`", undefined);
  }
}
