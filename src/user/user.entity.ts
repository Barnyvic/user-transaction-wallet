import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Roles } from './enum/roles.enum';

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

  @Column({ default: Roles.USER })
  role: Roles;
}
