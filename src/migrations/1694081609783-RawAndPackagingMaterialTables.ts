import { MigrationInterface, QueryRunner } from "typeorm";

export class RawAndPackagingMaterialTables1694081609783 implements MigrationInterface {
    name = 'RawAndPackagingMaterialTables1694081609783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "packaging_material" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "barcode" character varying NOT NULL, "sku" character varying NOT NULL, "quantity" integer NOT NULL, "unit" character varying NOT NULL, "basePrice" character varying NOT NULL, "reserve" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierId" uuid, CONSTRAINT "UQ_601add5e32bbeb90defaf7381cd" UNIQUE ("name"), CONSTRAINT "UQ_3572e4eb75a6e821d37249b7751" UNIQUE ("barcode"), CONSTRAINT "PK_bca843a33f5a16446a323b470ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "raw_material" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "barcode" character varying NOT NULL, "sku" character varying NOT NULL, "quantity" integer NOT NULL, "unit" character varying NOT NULL, "basePrice" character varying NOT NULL, "reserve" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierId" uuid, CONSTRAINT "UQ_a280e6bf273bfae9a726ca9703a" UNIQUE ("name"), CONSTRAINT "UQ_91a947e7c74a836859342831ba0" UNIQUE ("barcode"), CONSTRAINT "PK_78620c6a699438f30545519c86b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "packaging_material" ADD CONSTRAINT "FK_14c3336e4811e28c67b45a5b46e" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "raw_material" ADD CONSTRAINT "FK_301f9fe6ee36b18b03ea619798c" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_material" DROP CONSTRAINT "FK_301f9fe6ee36b18b03ea619798c"`);
        await queryRunner.query(`ALTER TABLE "packaging_material" DROP CONSTRAINT "FK_14c3336e4811e28c67b45a5b46e"`);
        await queryRunner.query(`DROP TABLE "raw_material"`);
        await queryRunner.query(`DROP TABLE "packaging_material"`);
    }

}
