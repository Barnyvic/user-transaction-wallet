import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import WalletService from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { FundWalletDto } from './dto/fundwallet.dto';
import { DebitWalletDto } from './dto/debitwallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('fundwallet')
  @UseGuards(AuthGuard())
  fundWallet(@Req() req, @Body() walletDto: FundWalletDto) {
    return this.walletService.fundWallet(req.user, walletDto);
  }

  @Post('debitwallet')
  @UseGuards(AuthGuard())
  debitWallet(@Req() req, @Body() debitWalletDto: DebitWalletDto) {
    return this.walletService.debitWallet(req.user, debitWalletDto);
  }
}
