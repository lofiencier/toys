import http from 'http';
import express from 'express';
import Sharedb from 'sharedb';
import { Server } from 'ws';
import { COLLECTION_NAME, DEFAULT_TOPIC, PORT, WS_URL } from '@corp/enums';
// @ts-ignore
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

const backend = new Sharedb();

const createConnectedDocument = (cb: () => void) => {
  const connection = backend.connect();
  const doc = connection.get(COLLECTION_NAME, DEFAULT_TOPIC);
  doc.fetch((err) => {
    if(err) throw err;
    if(doc.type === null) {
      doc.create({ content: '' }, cb);
      return ;
    }
    cb();
  })
};

const startServer = () => {
  const app = express();
  const server = http.createServer(app);
  const wss = new Server({ server });
  wss.on('connection', (buffer) => {
    var stream = new WebSocketJSONStream(buffer); 
    backend.listen(stream);
  });
  server.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
}

createConnectedDocument(startServer);
