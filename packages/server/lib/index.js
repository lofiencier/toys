"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _sharedb = _interopRequireDefault(require("sharedb"));

var _ws = require("ws");

var _enums = require("@corp/enums");

var _websocketJsonStream = _interopRequireDefault(require("@teamwork/websocket-json-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
const backend = new _sharedb.default();

const createConnectedDocument = cb => {
  const connection = backend.connect();
  const doc = connection.get(_enums.COLLECTION_NAME, _enums.DEFAULT_TOPIC);
  doc.fetch(err => {
    if (err) throw err;

    if (doc.type === null) {
      doc.create({
        content: ''
      }, cb);
      return;
    }

    cb();
  });
};

const startServer = () => {
  const app = (0, _express.default)();

  const server = _http.default.createServer(app);

  const wss = new _ws.Server({
    server
  });
  wss.on('connection', buffer => {
    var stream = new _websocketJsonStream.default(buffer);
    backend.listen(stream);
  });
  server.listen(_enums.PORT);
  console.log(`Listening on http://localhost:${_enums.PORT}`);
};

createConnectedDocument(startServer);