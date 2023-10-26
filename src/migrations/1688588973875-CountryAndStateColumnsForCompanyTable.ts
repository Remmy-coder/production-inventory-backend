import { MigrationInterface, QueryRunner } from "typeorm";

export class CountryAndStateColumnsForCompanyTable1688588973875 implements MigrationInterface {
    name = 'CountryAndStateColumnsForCompanyTable1688588973875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD "state" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "country"`);
    }

}
