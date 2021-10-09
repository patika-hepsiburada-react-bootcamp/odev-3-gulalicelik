import { io } from 'socket.io-client';

let socket;
export const connectSocket = () => {
  console.log('Connectting');
  socket = io(process.env.REACT_APP_BACKEND_ENDPOINT, {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('connect_error', () => {
    console.error('Connection failed.');
  });
};
