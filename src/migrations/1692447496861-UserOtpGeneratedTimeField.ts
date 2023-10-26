import { MigrationInterface, QueryRunner } from "typeorm";

export class UserOtpGeneratedTimeField1692447496861 implements MigrationInterface {
    name = 'UserOtpGeneratedTimeField1692447496861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "otpGeneratedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otpGeneratedAt"`);
    }

}
