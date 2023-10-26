import { Company } from 'src/company/entities/company.entity';
import { FinishedProductPackagingMaterial } from 'src/finished-product-packaging-material/entities/finished-product-packaging-material.entity';
import { FinishedProductRawMaterial } from 'src/finished-product-raw-material/entities/finished-product-raw-material.entity';
import { PackagingMaterial } from 'src/packaging-material/entities/packaging-material.entity';
import { RawMaterial } from 'src/raw-material/entities/raw-material.entity';
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name', 'barcode', 'company'])
export class FinishedProduct extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column()
  sku: string;

  @Column('int')
  expectedQuantity: number;

  @Column()
  unit: string;

  @Column('int')
  basePrice: number;

  @ManyToOne(() => Company, (company) => company.finishedProducts)
  company: Company;

  @OneToMany(
    () => FinishedProductRawMaterial,
    (finishedProductRawMaterial) => finishedProductRawMaterial.finishedProduct,
  )
  finishedProductRawMaterial: FinishedProductRawMaterial[];

  @OneToMany(
    () => FinishedProductPackagingMaterial,
    (finishedProductPackagingMaterial) =>
      finishedProductPackagingMaterial.finishedProduct,
  )
  finishedProductPackagingMaterial: FinishedProductPackagingMaterial[];

  @Column({
    enum: MaterialApprovalStatus,
    default: MaterialApprovalStatus.PENDING,
  })
  approvalStatus: MaterialApprovalStatus;

  @Column({ type: 'timestamp', nullable: true })
  approvalDate: Date;

  @Column({ nullable: true, length: 100 })
  reasonForDisapproval: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
