import { Currencies } from 'src/currencies/entities/currencies.entity';
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

  @OneToMany(() => User, (user) => user.company)
  user: User[];

  @OneToOne(() => Currencies)
  @JoinColumn()
  currency: Currencies;

  @OneToMany(() => Supplier, (supplier) => supplier.company)
  supplier: Supplier[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
