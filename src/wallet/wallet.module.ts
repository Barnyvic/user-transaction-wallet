import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [WalletService],
})
export class WalletModule {}
