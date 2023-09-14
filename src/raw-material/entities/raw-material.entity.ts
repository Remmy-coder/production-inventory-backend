import { Company } from 'src/company/entities/company.entity';
import { FinishedProduct } from 'src/finished-product/entities/finished-product.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name', 'barcode', 'company'])
export class RawMaterial extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
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

  @ManyToOne(() => Company, (company) => company.rawMaterials)
  company: Company;

  @ManyToOne(() => Supplier, (supplier) => supplier.rawMaterials)
  supplier: Supplier;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
