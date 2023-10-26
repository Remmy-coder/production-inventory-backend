import { MigrationInterface, QueryRunner } from "typeorm";

export class RawAndPackagingMaterialUniqueColumns1694377334254 implements MigrationInterface {
    name = 'RawAndPackagingMaterialUniqueColumns1694377334254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_a280e6bf273bfae9a726ca9703a"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_91a947e7c74a836859342831ba0"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP CONSTRAINT "UQ_601add5e32bbeb90defaf7381cd"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP CONSTRAINT "UQ_3572e4eb75a6e821d37249b7751"`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_6998acb5145561f04d7b9dea3ac" UNIQUE ("name", "barcode", "companyId")`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD CONSTRAINT "UQ_f27b3f02268e465693012cc287b" UNIQUE ("name", "barcode", "companyId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP CONSTRAINT "UQ_f27b3f02268e465693012cc287b"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "UQ_6998acb5145561f04d7b9dea3ac"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD CONSTRAINT "UQ_3572e4eb75a6e821d37249b7751" UNIQUE ("barcode")`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD CONSTRAINT "UQ_601add5e32bbeb90defaf7381cd" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_91a947e7c74a836859342831ba0" UNIQUE ("barcode")`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "UQ_a280e6bf273bfae9a726ca9703a" UNIQUE ("name")`);
    }

}
