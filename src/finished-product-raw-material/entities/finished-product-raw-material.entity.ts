import { FinishedProduct } from 'src/finished-product/entities/finished-product.entity';
import { RawMaterial } from 'src/raw-material/entities/raw-material.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FinishedProductRawMaterial extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => FinishedProduct,
    (finishedProduct) => finishedProduct.finishedProductRawMaterial,
  )
  finishedProduct: FinishedProduct;

  @ManyToOne(() => RawMaterial)
  rawMaterial: RawMaterial;

  @Column('int')
  usedQuantity: number;
}
