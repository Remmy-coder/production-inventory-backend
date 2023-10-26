import { MigrationInterface, QueryRunner } from "typeorm";

export class FinishedProductTable1695126920060 implements MigrationInterface {
    name = 'FinishedProductTable1695126920060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "finished_product_packaging_material" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usedQuantity" integer NOT NULL, "finishedProductId" uuid, "packagingMaterialId" uuid, CONSTRAINT "PK_830e83ccd554b6bb2139410e229" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "finished_product_raw_material" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usedQuantity" integer NOT NULL, "finishedProductId" uuid, "rawMaterialId" uuid, CONSTRAINT "PK_4ff153ea1cb9b4df650eaf20e63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "finished_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "barcode" character varying NOT NULL, "sku" character varying NOT NULL, "expectedQuantity" integer NOT NULL, "unit" character varying NOT NULL, "basePrice" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "UQ_0ff0f3af7ba3c886103d0efab04" UNIQUE ("name", "barcode", "companyId"), CONSTRAINT "PK_cb514142a87d5b5352a4f480460" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "finished_product_packaging_material" ADD CONSTRAINT "FK_b171d4a963e5b6e23e944747166" FOREIGN KEY ("finishedProductId") REFERENCES "finished_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "finished_product_packaging_material" ADD CONSTRAINT "FK_ee7c9f4c70c36bedbdd99ae70b6" FOREIGN KEY ("packagingMaterialId") REFERENCES "packaging_material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "finished_product_raw_material" ADD CONSTRAINT "FK_5d16ae7fbcc4ecac895996b11ef" FOREIGN KEY ("finishedProductId") REFERENCES "finished_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "finished_product_raw_material" ADD CONSTRAINT "FK_976f5cdc1ee749f0fb6c839514e" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "finished_product" ADD CONSTRAINT "FK_a4d18689d67c4ae95860b3f731d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "finished_product" DROP CONSTRAINT "FK_a4d18689d67c4ae95860b3f731d"`);
        await queryRunner.query(`ALTER TABLE "finished_product_raw_material" DROP CONSTRAINT "FK_976f5cdc1ee749f0fb6c839514e"`);
        await queryRunner.query(`ALTER TABLE "finished_product_raw_material" DROP CONSTRAINT "FK_5d16ae7fbcc4ecac895996b11ef"`);
        await queryRunner.query(`ALTER TABLE "finished_product_packaging_material" DROP CONSTRAINT "FK_ee7c9f4c70c36bedbdd99ae70b6"`);
        await queryRunner.query(`ALTER TABLE "finished_product_packaging_material" DROP CONSTRAINT "FK_b171d4a963e5b6e23e944747166"`);
        await queryRunner.query(`DROP TABLE "finished_product"`);
        await queryRunner.query(`DROP TABLE "finished_product_raw_material"`);
        await queryRunner.query(`DROP TABLE "finished_product_packaging_material"`);
    }

}
