import { Module, forwardRef } from '@nestjs/common';
import WalletService from './wallet.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Wallet } from './wallet.entity';
import { WalletController } from './wallet.controller';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { TransactionEntity } from 'src/transactions/transactions-entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TransactionsModule),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([TransactionEntity]),
    TypeOrmModule.forFeature([Wallet]),
    forwardRef(() => AuthModule),
  ],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
