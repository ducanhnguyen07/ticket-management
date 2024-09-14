import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTicketConstEnumAddPaid1726238154737 implements MigrationInterface {
    name = 'ChangeTicketConstEnumAddPaid1726238154737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."ticket_status_enum" RENAME TO "ticket_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_status_enum" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" TYPE "public"."ticket_status_enum" USING "status"::"text"::"public"."ticket_status_enum"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TYPE "public"."ticket_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ticket_status_enum_old" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" TYPE "public"."ticket_status_enum_old" USING "status"::"text"::"public"."ticket_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TYPE "public"."ticket_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."ticket_status_enum_old" RENAME TO "ticket_status_enum"`);
    }

}
