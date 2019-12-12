import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDEMAILINDEX1576118484821 implements MigrationInterface {
    name = "ADDEMAILINDEX1576118484821";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `FK_9baa86a15b26d03b384e35bc290` ON `invite`", undefined);
        await queryRunner.query("DROP INDEX `FK_56adaed4f38934440c8a88cd50b` ON `profile`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`)", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD PRIMARY KEY (`id`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD PRIMARY KEY (`id`)", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `email_uniq_index` ON `user` (`emailLocalpart`, `emailDomain`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `email_uniq_index` ON `invite` (`emailLocalpart`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD CONSTRAINT `FK_91bfeec7a9574f458e5b592472d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_a24972ebd73b106250713dcddd9`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP FOREIGN KEY `FK_91bfeec7a9574f458e5b592472d`", undefined);
        await queryRunner.query("DROP INDEX `email_uniq_index` ON `invite`", undefined);
        await queryRunner.query("DROP INDEX `email_uniq_index` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD PRIMARY KEY (`id`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `invite` ADD PRIMARY KEY (`id`, `emailLocalpart`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `invite` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`, `emailLocalpart`, `emailDomain`)", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("CREATE INDEX `FK_56adaed4f38934440c8a88cd50b` ON `profile` (`userId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_9baa86a15b26d03b384e35bc290` ON `invite` (`userId`)", undefined);
    }

}
