import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToTicket1726159117293 implements MigrationInterface {
    name = 'AddStatusToTicket1726159117293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ticket_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "status" "public"."ticket_status_enum" NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_status_enum"`);
    }

}
