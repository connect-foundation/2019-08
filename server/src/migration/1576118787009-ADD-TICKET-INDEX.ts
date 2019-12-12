import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDTICKETINDEX1576118787009 implements MigrationInterface {
    name = "ADDTICKETINDEX1576118787009";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `invite` ADD UNIQUE INDEX `IDX_d3c3a6d023f98b06847bf7879a` (`ticketId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `ticket_uniq_index` ON `invite` (`ticketId`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `ticket_uniq_index` ON `invite`", undefined);
        await queryRunner.query("ALTER TABLE `invite` DROP INDEX `IDX_d3c3a6d023f98b06847bf7879a`", undefined);
    }

}
