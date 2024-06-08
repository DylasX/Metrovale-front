import { io } from 'socket.io-client';

const urlChat = import.meta.env.VITE_CHAT_GATEWAY;

export const socket = io(urlChat, {
  transports: ['websocket'],
  autoConnect: false,
});
