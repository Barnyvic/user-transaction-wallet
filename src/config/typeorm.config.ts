import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TransactionEntity } from '../Transaction/transaction.entity';
import { Wallet } from '../wallet/wallet.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [TransactionEntity, User, Wallet],
  autoLoadEntities: true,
};
