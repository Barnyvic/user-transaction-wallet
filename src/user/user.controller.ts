import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AddressDto } from './dto/address-dto';
import { RolesGuard } from '../auth/guards/role.guards';
import { Roles } from '../auth/guards/role-decorator';
import { Role } from './enum/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.USER)
  hello(@Req() req) {
    return this.userService.findById(req.user.id);
  }

  @Put('update-user')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.USER)
  updateUser(@Req() req, @Body() addressDto: AddressDto) {
    return this.userService.updateAddress(req.user.id, addressDto.address);
  }
  // for admin
  @Get('all-users')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.ADMIN)
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
