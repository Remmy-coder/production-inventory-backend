import { MigrationInterface, QueryRunner } from "typeorm";

export class RawAndPackagingMaterialRelationWithCompany1694082682965 implements MigrationInterface {
    name = 'RawAndPackagingMaterialRelationWithCompany1694082682965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "FK_0945b29898d2402bc42ebf77b1a" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD CONSTRAINT "FK_28a7b1a9059e6d66a4cb48ed9d7" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP CONSTRAINT "FK_28a7b1a9059e6d66a4cb48ed9d7"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "FK_0945b29898d2402bc42ebf77b1a"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "companyId"`);
    }

}
