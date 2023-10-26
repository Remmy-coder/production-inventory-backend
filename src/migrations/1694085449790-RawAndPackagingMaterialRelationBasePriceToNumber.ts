import { MigrationInterface, QueryRunner } from "typeorm";

export class RawAndPackagingMaterialRelationBasePriceToNumber1694085449790 implements MigrationInterface {
    name = 'RawAndPackagingMaterialRelationBasePriceToNumber1694085449790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "basePrice"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "basePrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP COLUMN "basePrice"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD "basePrice" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP COLUMN "basePrice"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD "basePrice" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "basePrice"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "basePrice" character varying NOT NULL`);
    }

}
