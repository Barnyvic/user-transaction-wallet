import { Module, forwardRef } from '@nestjs/common';
import WalletService from './wallet.service';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TransactionEntity } from '../Transaction/transaction.entity';
import { AuthModule } from '../auth/auth.module';
import { Wallet } from './wallet.entity';
import { WalletController } from './wallet.controller';

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
})
export class WalletModule {}
