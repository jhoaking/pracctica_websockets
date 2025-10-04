import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entity/message.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
