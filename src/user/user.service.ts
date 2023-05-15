import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    delete user.password;
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async updateAddress(id: number, address: string): Promise<User | undefined> {
    await this.userRepository.update(id, { address });
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
