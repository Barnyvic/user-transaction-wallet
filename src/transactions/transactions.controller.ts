import { TransactionsService } from './transactions.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RolesGuard } from '../auth/guards/role.guards';
import { Role } from '../user/enum/roles.enum';
import { Roles } from '../auth/guards/role-decorator';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TransactionEntity } from './transactions-entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('generate_transaction_ref')
  @UseGuards(AuthGuard())
  generateTransactionRef(@Req() req) {
    return this.transactionService.createTransactionRef(req.user);
  }

  @Get('/transactions')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.ADMIN)
  getTransactions(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<TransactionEntity>> {
    const userId = req.user.id;
    return this.transactionService.getUserTransactions(userId, { page, limit });
  }
}
