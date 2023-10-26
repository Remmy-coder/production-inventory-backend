import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyWithoutPswrd1686774527596 implements MigrationInterface {
    name = 'CompanyWithoutPswrd1686774527596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "password" character varying NOT NULL`);
    }

}
