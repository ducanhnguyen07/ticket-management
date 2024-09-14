import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTimeInBookingAllowNull1726219936948 implements MigrationInterface {
    name = 'ChangeTimeInBookingAllowNull1726219936948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "confirmTime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "payTime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "payTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "confirmTime" SET NOT NULL`);
    }

}
