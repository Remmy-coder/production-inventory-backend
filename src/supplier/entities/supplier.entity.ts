import { Company } from 'src/company/entities/company.entity';
import { PackagingMaterial } from 'src/packaging-material/entities/packaging-material.entity';
import { RawMaterial } from 'src/raw-material/entities/raw-material.entity';
import { SupplierContact } from 'src/supplier-contact/entities/supplier-contact.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name', 'company'])
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column('text')
  address: string;

  @Column({ nullable: true })
  website: string;

  @OneToOne(() => SupplierContact, { cascade: true })
  @JoinColumn()
  supplierContact: SupplierContact;

  @ManyToOne(() => Company, (company) => company.supplier)
  company: Company;

  @OneToMany(() => RawMaterial, (rawMaterial) => rawMaterial.supplier, {
    cascade: true,
  })
  rawMaterials: RawMaterial[];

  @OneToMany(
    () => PackagingMaterial,
    (packagingMaterial) => packagingMaterial.supplier,
    { cascade: true },
  )
  packagingMaterials: PackagingMaterial[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
