import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({cors : true})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()
  server:Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService : JwtService
  ) {}

  handleDisconnect(client: Socket) {
    throw new Error('Method not implemented.');
  }
  handleConnection(client: Socket, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
}
