import { IsNotEmpty, IsNumber } from 'class-validator';

export class DebitWalletDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  walletId: number;
}
