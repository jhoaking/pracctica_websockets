import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entity/message.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [TypeOrmModule.forFeature([Messages]), AuthModule],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
