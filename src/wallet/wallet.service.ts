import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { TransactionService } from 'src/transaction/transaction.service';
import { Wallet } from './wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';
import { FundWalletDto } from './dto/fundwallet.dto';
import { DebitWalletDto } from './dto/debitwallet.dto';

@Injectable()
export default class WalletService {
  constructor(
    private readonly transactionService: TransactionService,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async fundWallet(user: User, walletDto: FundWalletDto) {
    //check if transactionRef is valid
    const existingTransaction =
      await this.transactionService.findTransactionByRef(
        walletDto.transactionRef,
      );
    const isValid = await this.transactionService.validateTransactionRef(
      existingTransaction.transactionRef,
    );
    if (isValid == false) {
      return false;
    }
    // add amount to wallet
    const newWallet = new Wallet();
    newWallet.transactions = [existingTransaction];
    newWallet.user = user;
    newWallet.balance = walletDto.amount;
    await this.userService.updateUserBalance(user.id, walletDto.amount);

    await this.walletRepository.save(newWallet);
    return newWallet.balance;
  }

  async getWalletByUserId(user): Promise<Wallet> {
    return this.walletRepository.findOne({ where: { user: user } });
  }

  async debitWallet(user: User, walletDto: DebitWalletDto): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      where: { id: walletDto.walletId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (wallet.balance - walletDto.amount < 0) {
      throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
    }

    wallet.balance -= walletDto.amount;
    await this.walletRepository.save(wallet);

    await this.userService.updateUserBalance(user.id, wallet.balance);

    return wallet;
  }
}
