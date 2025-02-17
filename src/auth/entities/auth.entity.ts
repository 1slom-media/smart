import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  @IsString()
  email: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  full_name: string;

  @Column({ type: 'varchar' })
  @IsString()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  access_token: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  refresh_token: string;

  @Column({ type: 'varchar', default: 'bearer' })
  @IsString()
  token_type: string;

  @Column({ default: 5184000 })
  @IsString()
  expires_in: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
