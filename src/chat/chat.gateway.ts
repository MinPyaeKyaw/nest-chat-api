import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: { content: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const savedMessage = await this.chatService.saveMessage(
      message.content,
      message.userId,
    );

    client.broadcast.emit('message', savedMessage);
    return savedMessage;
  }

  @SubscribeMessage('requestMessages')
  handleRequestMessages(client: Socket): void {
    const messages = this.chatService.messages();
    client.emit('messageList', messages);
  }
}
