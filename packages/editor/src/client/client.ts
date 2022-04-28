import ReconnectingWebsocket from 'reconnecting-websocket';
import { Connection, Doc } from 'sharedb/lib/client';
import { COLLECTION_NAME, WS_URL, DataContent } from '@corp/enums';
import { diff_match_patch as DMP } from 'diff-match-patch';
import { Op, Path } from 'sharedb';
import { ClientEventType, PathType } from '../types';
import Chain from './chain';

class Client extends Connection {
  static docs: Map<string, Doc> = new Map();
  static socket: ReconnectingWebsocket;
  topic: string;
  history: Map<string, Op | Op[]> = new Map();
  eventMaps: Map<ClientEventType, Set<Function>> = new Map();
  _chain?: Chain;

  constructor(topic: string, socket: ReconnectingWebsocket = Client.socket || new ReconnectingWebsocket(WS_URL, COLLECTION_NAME)) {
    // @ts-ignore
    super(socket);
    Client.socket = socket;
    const doc = this.get(COLLECTION_NAME, topic);
    this.topic = topic;
    Client.docs.set(topic, doc);
    doc.subscribe(this.handleUpdate);
    doc.on('op', this.handleUpdate);
  }

  handleChainEnd = (operations: Op[]) => {
    this.history.set(String(+new Date()), operations);
    return this;
  };
  handleUpdate = (...rest: any[]) => {
    const updateCallbacks = this.eventMaps.get('update');
    Array.from(updateCallbacks || []).forEach(x => x(this.doc?.data));
  }
  on(event: ClientEventType, callback: Function) {
    if (!this.eventMaps.get(event)) {
      this.eventMaps.set(event, new Set());
    };
    const targetEvents = this.eventMaps.get(event);
    targetEvents!.add(callback);
  }
  off(event: ClientEventType, callback: Function) {
    if (!this.eventMaps.get(event)) return;
    this.eventMaps.get(event)!.delete(callback);
  }
  resetTopic = (topic: string) => {
    const doc = this.get(COLLECTION_NAME, topic);
    Client.docs.set(topic, doc);
  }
  submit = () => {
    const key = Array.from(this.history.keys()).map(x => Number(x)).sort((a, b) => b - a)[0];
    const operations = this.history.get(String(key));
    if (!key || !operations) return;
    console.log('operations', operations);
    this.doc?.submitOp(operations);
  }
  get chain(): Chain {
    return this._chain = this._chain || new Chain(this.handleChainEnd);
  }
  get doc(): Doc | undefined {
    return Client.docs.get(this.topic);
  }
}


export default Client;