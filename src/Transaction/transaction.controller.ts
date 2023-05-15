import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { TransactionEntity } from './transaction.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RolesGuard } from '../auth/guards/role.guards';
import { Role } from '../user/enum/roles.enum';
import { Roles } from '../auth/guards/role-decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

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
