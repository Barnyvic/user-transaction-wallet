import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { UserService } from '../user/user.service';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async generateTransactionRef(user: User): Promise<string> {
    const exsistingUser = await this.userService.findById(user.id);
    const timestamp = new Date().getTime().toString().substr(-9);
    const userInitials = exsistingUser.firstName.slice(0, 3).toUpperCase();
    const transactionReference = `${userInitials}${timestamp}`;
    return transactionReference;
  }

  async createTransactionRef(user: User) {
    const transactionRef = await this.generateTransactionRef(user);
    console.log(transactionRef);
    const transaction = new TransactionEntity();
    transaction.user = user;
    transaction.transactionRef = transactionRef;

    await this.transactionRepository.save(transaction);

    return transaction.transactionRef;
  }

  async findTransactionByRef(ref: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOne({
      where: { transactionRef: ref },
    });

    return transaction;
  }

  async validateTransactionRef(ref: string): Promise<boolean> {
    const transaction = await this.transactionRepository.findOne({
      where: { transactionRef: ref },
    });

    if (!transaction) {
      return false; // Transaction ref not found
    }

    const expirationDate = new Date(transaction.createdAt);
    expirationDate.setSeconds(expirationDate.getSeconds() + 15);

    const currentDate = new Date();

    if (currentDate > expirationDate) {
      return false; // Transaction ref has expired
    }

    return true; // Transaction ref is valid
  }

  async getUserTransactions(
    userId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<TransactionEntity>> {
    const queryBuilder = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'user')
      .where('user.id = :userId', { userId })
      .orderBy('transaction.createdAt', 'DESC');

    return paginate<TransactionEntity>(queryBuilder, options);
  }

  async getUserTransactionDetails(
    userId: number,
  ): Promise<TransactionEntity[]> {
    return this.transactionRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });
  }
}
