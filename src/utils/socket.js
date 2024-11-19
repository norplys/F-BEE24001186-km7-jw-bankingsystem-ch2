/* eslint-disable no-console */
import { Server } from 'socket.io';

export let io;

export default (_app, server) => {
  io = new Server(server);

  io.on('connect', (socket) => { 

    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });
  });
};
