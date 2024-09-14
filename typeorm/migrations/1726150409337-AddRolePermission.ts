import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolePermission1726150409337 implements MigrationInterface {
    name = 'AddRolePermission1726150409337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."role_roleenum_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "roleEnum" "public"."role_roleenum_enum" NOT NULL DEFAULT '0', CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_role" ("permissionId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_51d32d42a2ef7d1bc085da1510d" PRIMARY KEY ("permissionId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1886001bdced4ea977b9f1b97c" ON "permission_role" ("permissionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1dd59c61aec4fc206bc43a3115" ON "permission_role" ("roleId") `);
        await queryRunner.query(`CREATE TABLE "role_user" ("roleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_bd1bd925dd24214f451e44259ed" PRIMARY KEY ("roleId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89e55dae19555d0d5fe8602b28" ON "role_user" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a23ceb75c7511d0523c4aaf49" ON "role_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "confirmTime"`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_1886001bdced4ea977b9f1b97c1" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_1dd59c61aec4fc206bc43a31153" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_89e55dae19555d0d5fe8602b281" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_89e55dae19555d0d5fe8602b281"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_1dd59c61aec4fc206bc43a31153"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_1886001bdced4ea977b9f1b97c1"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "confirmTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a23ceb75c7511d0523c4aaf49"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89e55dae19555d0d5fe8602b28"`);
        await queryRunner.query(`DROP TABLE "role_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1dd59c61aec4fc206bc43a3115"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1886001bdced4ea977b9f1b97c"`);
        await queryRunner.query(`DROP TABLE "permission_role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_roleenum_enum"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
