import { MigrationInterface, QueryRunner } from "typeorm";

export class CurrencyTable1686991198225 implements MigrationInterface {
    name = 'CurrencyTable1686991198225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currencies" ("id" SERIAL NOT NULL, "cc" character varying NOT NULL, "symbol" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_9b074cf7efb8ce7e66e438e8576" UNIQUE ("cc"), CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "currencies"`);
    }

}
