import type { Socket } from 'socket.io';
export declare class ChatGateway {
    handleMessage(client: Socket, payload: any): Promise<void>;
    handleChatMessage(client: Socket, payload: any): void;
    handleTyping(client: Socket, payload: any): void;
    handleStopTyping(client: Socket, payload: any): void;
    handleConnection(conn: any): void;
}
