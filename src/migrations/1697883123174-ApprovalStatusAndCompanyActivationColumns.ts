import { MigrationInterface, QueryRunner } from "typeorm";

export class ApprovalStatusAndCompanyActivationColumns1697883123174 implements MigrationInterface {
    name = 'ApprovalStatusAndCompanyActivationColumns1697883123174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "approvalStatus" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "approvalDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD "reasonForDisapproval" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD "approvalStatus" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD "approvalDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD "reasonForDisapproval" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "finished_product" ADD "approvalStatus" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "finished_product" ADD "approvalDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "finished_product" ADD "reasonForDisapproval" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "company" ADD "activationStatus" character varying NOT NULL DEFAULT 'not-activated'`);
        await queryRunner.query(`ALTER TABLE "company" ADD "activationDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "activationDate"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "activationStatus"`);
        await queryRunner.query(`ALTER TABLE "finished_product" DROP COLUMN "reasonForDisapproval"`);
        await queryRunner.query(`ALTER TABLE "finished_product" DROP COLUMN "approvalDate"`);
        await queryRunner.query(`ALTER TABLE "finished_product" DROP COLUMN "approvalStatus"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP COLUMN "reasonForDisapproval"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP COLUMN "approvalDate"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP COLUMN "approvalStatus"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "reasonForDisapproval"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "approvalDate"`);
        await queryRunner.query(`ALTER TABLE "raw_material" DROP COLUMN "approvalStatus"`);
    }

}
