import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io';
import { Messages } from './entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';

interface Connectedclients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesService {
  private connectedClients: Connectedclients = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Messages)
    private readonly messageRepository: Repository<Messages>,
  ) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`user with ${userId} not found`);
    }
    if (!user.isActive) throw new Error('user not active');

    this.connectedClients[client.id] = {
      socket: client,
      user,
    };
  }
}
