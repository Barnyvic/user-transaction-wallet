import { Module, forwardRef } from '@nestjs/common';
import WalletService from './wallet.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TransactionEntity } from 'src/Transaction/transaction.entity';
import { AuthModule } from '../auth/auth.module';
import { Wallet } from './wallet.entity';
import { WalletController } from './wallet.controller';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TransactionModule),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([TransactionEntity]),
    TypeOrmModule.forFeature([Wallet]),
    forwardRef(() => AuthModule),
  ],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
