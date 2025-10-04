import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  message: string;

  @Column('text')
  user: string;
}
