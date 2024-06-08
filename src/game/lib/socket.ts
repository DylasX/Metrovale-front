import { io } from 'socket.io-client';

const urlChat = import.meta.env.VITE_GAME_GATEWAY;

export const socket = io(urlChat, {
  transports: ['websocket'],
  autoConnect: false,
});
