import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TransactionEntity } from '../Transaction/transaction.entity';
import { Wallet } from '../wallet/wallet.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Yungvicky007',
  database: 'UserTransaction',
  synchronize: true,
  logging: true,
  entities: [TransactionEntity, User, Wallet],
  autoLoadEntities: true,
};
