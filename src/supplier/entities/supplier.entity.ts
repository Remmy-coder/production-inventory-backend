import { Company } from 'src/company/entities/company.entity';
import { SupplierContact } from 'src/supplier-contact/entities/supplier-contact.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
