import { IsNumber, IsString } from 'class-validator';

export class FundWalletDto {
  @IsNumber()
  amount: number;
  @IsString()
  transactionRef: string;
}
