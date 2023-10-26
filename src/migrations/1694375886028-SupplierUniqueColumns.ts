import { MigrationInterface, QueryRunner } from "typeorm";

export class SupplierUniqueColumns1694375886028 implements MigrationInterface {
    name = 'SupplierUniqueColumns1694375886028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_contact" DROP CONSTRAINT "UQ_db9672963871be16eb61e7676b5"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "UQ_05290e39dd1ef4fbbcfe329f7bd"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "UQ_69443c7a4a407b92585bbfef163" UNIQUE ("name", "companyId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "UQ_69443c7a4a407b92585bbfef163"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "UQ_05290e39dd1ef4fbbcfe329f7bd" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "supplier_contact" ADD CONSTRAINT "UQ_db9672963871be16eb61e7676b5" UNIQUE ("email")`);
    }

}
