import backend, { types } from 'sharedb';
import client from 'sharedb/lib/client';

export const DEFAULT_TOPIC = 'DEFAULT_TOPIC';
export const COLLECTION_NAME = 'SYNC_DOCUMENT';
export const PORT = 8083;
export const PROTOCAL = 'ws://';
export const WS_URL = PROTOCAL + 'localhost:' + PORT;
export interface DataContent {
  content: string
}

export const cs = (base: string, extra: { [key: string]: boolean }) => {
  const rest = Object.keys(extra).filter(x => extra[x]).join(' ');
  return `${base ? base + ' ' : ''}${rest}`
};

// export const otTypeRegister = (type: string, server?: boolean) => {
//   return server? backend.types.register(type) : client.types.register(type);
// }