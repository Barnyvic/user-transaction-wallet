import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUpUser(body: CreateUserDto) {
    const user = await this.userService.findByEmail(body.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const createUser = new User();
    Object.assign(createUser, body);
    createUser.password = hashedPassword;
    await this.userService.createUser(createUser);
    delete createUser.password;
    return {
      message: 'User created successfully',
      createUser,
    };
  }

  async loginUser(body: LoginUserDto) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user.id });

    return {
      message: 'User logged in successfully',
      token,
    };
  }
}
