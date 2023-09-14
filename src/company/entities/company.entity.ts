import { Currencies } from 'src/currencies/entities/currencies.entity';
import { FinishedProduct } from 'src/finished-product/entities/finished-product.entity';
import { PackagingMaterial } from 'src/packaging-material/entities/packaging-material.entity';
import { RawMaterial } from 'src/raw-material/entities/raw-material.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column('text')
  address: string;

  @OneToMany(() => User, (user) => user.company, { cascade: true })
  user: User[];

  @OneToOne(() => Currencies)
  @JoinColumn()
  currency: Currencies;

  @OneToMany(() => Supplier, (supplier) => supplier.company, { cascade: true })
  supplier: Supplier[];

  @OneToMany(() => RawMaterial, (rawMaterial) => rawMaterial.company, {
    cascade: true,
  })
  rawMaterials: RawMaterial[];

  @OneToMany(
    () => PackagingMaterial,
    (packagingMaterial) => packagingMaterial.company,
    { cascade: true },
  )
  packagingMaterials: PackagingMaterial[];

  @OneToMany(
    () => FinishedProduct,
    (finishedProduct) => finishedProduct.company,
    { cascade: true },
  )
  finishedProducts: FinishedProduct[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
