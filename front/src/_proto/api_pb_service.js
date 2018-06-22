// package: api
// file: api.proto

var api_pb = require("./api_pb");
var grpc = require("grpc-web-client").grpc;

var Pinger = (function () {
  function Pinger() {}
  Pinger.serviceName = "api.Pinger";
  return Pinger;
}());

Pinger.SendPing = {
  methodName: "SendPing",
  service: Pinger,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.PingRequest,
  responseType: api_pb.PingReply
};

exports.Pinger = Pinger;

function PingerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PingerClient.prototype.sendPing = function sendPing(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Pinger.SendPing, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

exports.PingerClient = PingerClient;

