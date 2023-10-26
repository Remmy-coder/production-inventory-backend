import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyTableMigration1686729531426 implements MigrationInterface {
    name = 'CompanyTableMigration1686729531426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "address" text NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
