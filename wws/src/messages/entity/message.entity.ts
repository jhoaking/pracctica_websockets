import { User } from 'src/auth/entities/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  message: string;

  @ManyToOne(
    () => User,
    (user) => user.messages,
    {eager:true}
  )
  user: User;
}
