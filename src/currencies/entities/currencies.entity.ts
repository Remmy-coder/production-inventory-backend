import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currencies {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  cc: string;

  @Column()
  symbol: string;

  @Column()
  name: string;
}
