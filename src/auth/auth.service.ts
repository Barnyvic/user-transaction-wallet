import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUpUser(body: CreateUserDto) {
    const user = await this.userService.findByEmail(body.email);
    if (user) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
    await this.userService.createUser(body);
    return {
      message: 'User created successfully',
    };
  }
}
