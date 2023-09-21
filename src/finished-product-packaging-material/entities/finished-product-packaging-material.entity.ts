import { FinishedProduct } from 'src/finished-product/entities/finished-product.entity';
import { PackagingMaterial } from 'src/packaging-material/entities/packaging-material.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FinishedProductPackagingMaterial extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => FinishedProduct,
    (finishedProduct) => finishedProduct.finishedProductPackagingMaterial,
  )
  finishedProduct: FinishedProduct;

  @ManyToOne(() => PackagingMaterial)
  packagingMaterial: PackagingMaterial;

  @Column('int')
  usedQuantity: number;
}
