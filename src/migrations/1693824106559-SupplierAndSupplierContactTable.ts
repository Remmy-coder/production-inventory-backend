import { MigrationInterface, QueryRunner } from "typeorm";

export class SupplierAndSupplierContactTable1693824106559 implements MigrationInterface {
    name = 'SupplierAndSupplierContactTable1693824106559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier_contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "dialcode" character varying NOT NULL, "phoneNumber" integer NOT NULL, CONSTRAINT "UQ_db9672963871be16eb61e7676b5" UNIQUE ("email"), CONSTRAINT "PK_5f15c23fae212c40a4d683efe86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "address" text NOT NULL, "website" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierContactId" uuid, "companyId" uuid, CONSTRAINT "UQ_05290e39dd1ef4fbbcfe329f7bd" UNIQUE ("name"), CONSTRAINT "REL_7577a44ea3da0370f01647ef11" UNIQUE ("supplierContactId"), CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_7577a44ea3da0370f01647ef112" FOREIGN KEY ("supplierContactId") REFERENCES "supplier_contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_860a390e2874a2150121f36ae9d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_860a390e2874a2150121f36ae9d"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_7577a44ea3da0370f01647ef112"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "supplier_contact"`);
    }

}
