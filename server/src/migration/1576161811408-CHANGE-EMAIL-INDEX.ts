import {MigrationInterface, QueryRunner} from "typeorm";

export class CHANGEEMAILINDEX1576161811408 implements MigrationInterface {
    name = "CHANGEEMAILINDEX1576161811408";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `email_uniq_index` ON `invite`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d3c3a6d023f98b06847bf7879a` ON `invite`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `invite_email_snug_uniq_index` ON `invite` (`snugId`, `emailLocalpart`, `emailDomain`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `invite_email_snug_uniq_index` ON `invite`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_d3c3a6d023f98b06847bf7879a` ON `invite` (`ticketId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `email_uniq_index` ON `invite` (`emailLocalpart`, `emailDomain`)", undefined);
    }

}