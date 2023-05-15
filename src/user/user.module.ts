import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { WalletModule } from '../wallet/wallet.module';
import { TransactionModule } from '../transaction/transaction.module';
import { TransactionEntity } from '../Transaction/transaction.entity';
import { Wallet } from '../wallet/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([TransactionEntity]),
    TypeOrmModule.forFeature([Wallet]),
    forwardRef(() => AuthModule),
    forwardRef(() => WalletModule),
    forwardRef(() => TransactionModule),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
