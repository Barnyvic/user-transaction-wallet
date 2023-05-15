import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Role } from './enum/roles.enum';
import { Wallet } from '../wallet/wallet.entity';
import { Transaction } from '../Transaction/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column({ default: Role.USER })
  role: Role;

  @OneToOne(() => Wallet, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @Column({ default: 0 })
  balance: number;
}
