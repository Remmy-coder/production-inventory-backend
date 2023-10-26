import { MigrationInterface, QueryRunner } from "typeorm";

export class UserOtpField1692445197369 implements MigrationInterface {
    name = 'UserOtpField1692445197369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "otpSecret" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otpSecret"`);
    }

}
