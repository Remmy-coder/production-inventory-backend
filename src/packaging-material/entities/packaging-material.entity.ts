import { Company } from 'src/company/entities/company.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PackagingMaterial extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  barcode: string;

  @Column()
  sku: string;

  @Column('int')
  quantity: number;

  @Column()
  unit: string;

  @Column('int')
  basePrice: number;

  @Column('int')
  reserve: number;

  @ManyToOne(() => Company, (company) => company.packagingMaterials)
  company: Company;

  @ManyToOne(() => Supplier, (supplier) => supplier.packagingMaterials)
  supplier: Supplier;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
