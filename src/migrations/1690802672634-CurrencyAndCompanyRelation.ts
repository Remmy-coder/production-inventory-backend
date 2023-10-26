import { MigrationInterface, QueryRunner } from "typeorm";

export class CurrencyAndCompanyRelation1690802672634 implements MigrationInterface {
    name = 'CurrencyAndCompanyRelation1690802672634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "currencyId" integer`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_220faa2a9ef7eaa5e983e42a574" UNIQUE ("currencyId")`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_220faa2a9ef7eaa5e983e42a574" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_220faa2a9ef7eaa5e983e42a574"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_220faa2a9ef7eaa5e983e42a574"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "currencyId"`);
    }

}
