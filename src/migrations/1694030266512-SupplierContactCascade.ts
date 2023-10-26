import { MigrationInterface, QueryRunner } from "typeorm";

export class SupplierContactCascade1694030266512 implements MigrationInterface {
    name = 'SupplierContactCascade1694030266512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_contact" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "supplier_contact" ADD "phoneNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_contact" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "supplier_contact" ADD "phoneNumber" integer NOT NULL`);
    }

}
