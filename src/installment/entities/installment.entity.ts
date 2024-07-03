// src/clients/client.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({  })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column('varchar', { length: 14 })
  idCard: string

  @Column()
  carName: string;

  @Column()
  carModel: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlyAmount: number;

  @Column()
  installments: number;

  @Column()
  day: number;

  @Column()
  month: string;

  @Column()
  year: number;

  @Column()
  notification: number;

  @Column({ default: "user" })
  role: string
}
