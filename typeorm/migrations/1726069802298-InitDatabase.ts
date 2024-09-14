import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1726069802298 implements MigrationInterface {
    name = 'InitDatabase1726069802298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "expireTime" TIMESTAMP NOT NULL, "cost" double precision NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "bookingTime" TIMESTAMP NOT NULL, "isConfirm" boolean NOT NULL DEFAULT false, "confirmTime" TIMESTAMP NOT NULL, "payTime" TIMESTAMP NOT NULL, "isPaid" boolean NOT NULL DEFAULT false, "otp" character varying NOT NULL DEFAULT '', "user" uuid, "ticket" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "availableBalance" double precision NOT NULL, "refreshToken" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_b3a629fbe6abb102b2f1a3d86fb" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_241a2688fe76de24ac7e269c611" FOREIGN KEY ("ticket") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_241a2688fe76de24ac7e269c611"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_b3a629fbe6abb102b2f1a3d86fb"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
