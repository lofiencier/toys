"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cs = exports.WS_URL = exports.PROTOCAL = exports.PORT = exports.COLLECTION_NAME = exports.DEFAULT_TOPIC = void 0;
exports.DEFAULT_TOPIC = 'DEFAULT_TOPIC';
exports.COLLECTION_NAME = 'SYNC_DOCUMENT';
exports.PORT = 8083;
exports.PROTOCAL = 'ws://';
exports.WS_URL = exports.PROTOCAL + 'localhost:' + exports.PORT;
const cs = (base, extra) => {
    const rest = Object.keys(extra).filter(x => extra[x]).join(' ');
    return `${base ? base + ' ' : ''}${rest}`;
};
exports.cs = cs;
