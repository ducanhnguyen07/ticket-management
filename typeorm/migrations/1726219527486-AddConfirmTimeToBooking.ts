import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConfirmTimeToBooking1726219527486 implements MigrationInterface {
    name = 'AddConfirmTimeToBooking1726219527486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "confirmTime" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "confirmTime"`);
    }

}
