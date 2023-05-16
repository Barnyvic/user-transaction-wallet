import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TransactionEntity } from '../Transaction/transaction.entity';
import { Wallet } from '../wallet/wallet.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'drona.db.elephantsql.com',
  port: 5432,
  username: 'nsizipmy',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [TransactionEntity, User, Wallet],
  autoLoadEntities: true,
};
