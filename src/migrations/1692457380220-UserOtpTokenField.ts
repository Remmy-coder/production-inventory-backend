import { MigrationInterface, QueryRunner } from "typeorm";

export class UserOtpTokenField1692457380220 implements MigrationInterface {
    name = 'UserOtpTokenField1692457380220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "otpToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otpToken"`);
    }

}
