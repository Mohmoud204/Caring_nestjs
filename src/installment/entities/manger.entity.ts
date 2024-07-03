import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Manger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({  })
  email: string;

  @Column()
  password: string;

  @Column({  })
  role: string
}