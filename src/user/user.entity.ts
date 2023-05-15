import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from './enum/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column({ default: Role.USER })
  role: Role;
}
