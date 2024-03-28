import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedBarcodeFromTheUniqueArrayOnPackagingMaterialEntity1709038344151 implements MigrationInterface {
    name = 'RemovedBarcodeFromTheUniqueArrayOnPackagingMaterialEntity1709038344151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP CONSTRAINT "UQ_f27b3f02268e465693012cc287b"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD CONSTRAINT "UQ_85f67019c278d1452245742c8af" UNIQUE ("name", "companyId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP CONSTRAINT "UQ_85f67019c278d1452245742c8af"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD CONSTRAINT "UQ_f27b3f02268e465693012cc287b" UNIQUE ("name", "barcode", "companyId")`);
    }

}
