import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Yungvicky007',
  database: 'UserTransaction',
  synchronize: true,
  logging: true,
  entities: [User],
};
