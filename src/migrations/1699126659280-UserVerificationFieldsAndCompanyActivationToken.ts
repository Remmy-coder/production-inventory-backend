import { MigrationInterface, QueryRunner } from "typeorm";

export class UserVerificationFieldsAndCompanyActivationToken1699126659280 implements MigrationInterface {
    name = 'UserVerificationFieldsAndCompanyActivationToken1699126659280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "verificationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD "activationToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "activationToken"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verificationToken"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
    }

}
