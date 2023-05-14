import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello')
  @UseGuards(AuthGuard())
  hello(@Req() req) {
    return this.userService.findById(req.user);
  }

  @Put('update-user')
  @UseGuards(AuthGuard())
  updateUser(@Req() req) {
    // return this.userService.updateAddress(req.user, req.body.address);
  }
}
