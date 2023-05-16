import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { WalletModule } from '../wallet/wallet.module';
import { Wallet } from '../wallet/wallet.entity';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { TransactionEntity } from 'src/transactions/transactions-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([TransactionEntity]),
    TypeOrmModule.forFeature([Wallet]),
    forwardRef(() => AuthModule),
    forwardRef(() => WalletModule),
    forwardRef(() => TransactionsModule),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
