// package: api
// file: api.proto

var api_pb = require("./api_pb");
var grpc = require("grpc-web-client").grpc;

var Api = (function () {
  function Api() {}
  Api.serviceName = "api.Api";
  return Api;
}());

Api.GetBalance = {
  methodName: "GetBalance",
  service: Api,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.BalanceRequest,
  responseType: api_pb.BalanceReply
};

Api.SendPing = {
  methodName: "SendPing",
  service: Api,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.PingRequest,
  responseType: api_pb.PingReply
};

Api.SendTx = {
  methodName: "SendTx",
  service: Api,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.TxItem,
  responseType: api_pb.SendTxReply
};

Api.PendingTxs = {
  methodName: "PendingTxs",
  service: Api,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.Empty,
  responseType: api_pb.PendingTxsReply
};

exports.Api = Api;

function ApiClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ApiClient.prototype.getBalance = function getBalance(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Api.GetBalance, {
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

ApiClient.prototype.sendPing = function sendPing(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Api.SendPing, {
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

ApiClient.prototype.sendTx = function sendTx(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Api.SendTx, {
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

ApiClient.prototype.pendingTxs = function pendingTxs(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Api.PendingTxs, {
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

exports.ApiClient = ApiClient;

