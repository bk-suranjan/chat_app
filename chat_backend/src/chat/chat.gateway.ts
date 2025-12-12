import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import type { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @SubscribeMessage('joinRoom')
  async handleMessage(client: Socket, payload: any) {
    console.log(`${payload} is joining the group`);

    await client.join('group');

    client.to('group').emit('roomNotice', payload);
    console.log('payload', payload);
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(client: Socket, payload: any) {
    client.to('group').emit('chatMessage', payload);
  }

  @SubscribeMessage('chatMessage')
  handleTyping(client: Socket, payload: any) {
    client.to('group').emit('typing', payload);
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(client: Socket, payload: any) {
    client.to('group').emit('stopTyping', payload);
  }
  // @SubscribeMessage('message')
  // handleMessage(client: Socket, payload: any): string {
  //   console.log('hello world', payload);
  //   return 'Hello world!';
  // }

  handleConnection(conn) {
    console.log('user connected', conn.id);
  }

  // handleDisconnect(conn) {
  //   console.log('user disconnect', conn.id);
  // }
}
