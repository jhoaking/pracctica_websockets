import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Socket} from 'socket.io'
import { Messages } from './entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

interface Connectedclients{
    [id:string]: {
        socket : Socket,
        user : string
    }
}


@Injectable()
export class MessagesService {

    constructor(
        @InjectRepository(Messages)
        private readonly messageRepository : Repository<Messages>
    ){}

    async registerClient(client: Socket , userId : string){
        
    }


}
