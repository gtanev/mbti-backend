#!/usr/bin/env node

import app from '../app';
import http from 'http';
import debug from 'debug';

const port = normalizePort(process.env.PORT || '3001');

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const adrs = server.address();
  const bind = typeof adrs === 'string' ? 'pipe ' + adrs : 'port ' + adrs.port;

  debug('mbti-backend:server')('Listening on ' + bind);
}
