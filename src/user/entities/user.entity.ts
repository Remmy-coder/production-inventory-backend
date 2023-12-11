import { Company } from 'src/company/entities/company.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserVerificationStatus } from 'src/utils/enums/user-verification-status.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  otpSecret: string;

  @Column({ nullable: true })
  otpToken: string;

  @Column({ type: 'timestamp', nullable: true })
  otpGeneratedAt: Date;

  @ManyToOne(() => Company, (company) => company.user)
  company: Company;

  @Column({
    enum: UserVerificationStatus,
    default: UserVerificationStatus.NOT_VERIFIED,
  })
  isVerified: UserVerificationStatus;

  @Column({ nullable: true })
  verificationToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @BeforeInsert()
  generateVerificationToken() {
    // Generate a random verification token (e.g., a 16-character hex string)
    this.verificationToken = crypto.randomBytes(8).toString('hex');
  }
}
