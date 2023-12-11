import { MigrationInterface, QueryRunner } from "typeorm";

export class UserVerificationFieldsChangedToEnum1700242314722 implements MigrationInterface {
    name = 'UserVerificationFieldsChangedToEnum1700242314722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" character varying NOT NULL DEFAULT 'not-verified'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

}
