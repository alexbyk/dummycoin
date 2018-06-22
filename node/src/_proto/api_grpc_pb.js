// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api_pb = require('./api_pb.js');

function serialize_api_BalanceReply(arg) {
  if (!(arg instanceof api_pb.BalanceReply)) {
    throw new Error('Expected argument of type api.BalanceReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_BalanceReply(buffer_arg) {
  return api_pb.BalanceReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_BalanceRequest(arg) {
  if (!(arg instanceof api_pb.BalanceRequest)) {
    throw new Error('Expected argument of type api.BalanceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_BalanceRequest(buffer_arg) {
  return api_pb.BalanceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_Empty(arg) {
  if (!(arg instanceof api_pb.Empty)) {
    throw new Error('Expected argument of type api.Empty');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Empty(buffer_arg) {
  return api_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_MineReply(arg) {
  if (!(arg instanceof api_pb.MineReply)) {
    throw new Error('Expected argument of type api.MineReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_MineReply(buffer_arg) {
  return api_pb.MineReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_MineRequest(arg) {
  if (!(arg instanceof api_pb.MineRequest)) {
    throw new Error('Expected argument of type api.MineRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_MineRequest(buffer_arg) {
  return api_pb.MineRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_PendingTxsReply(arg) {
  if (!(arg instanceof api_pb.PendingTxsReply)) {
    throw new Error('Expected argument of type api.PendingTxsReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_PendingTxsReply(buffer_arg) {
  return api_pb.PendingTxsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_PingReply(arg) {
  if (!(arg instanceof api_pb.PingReply)) {
    throw new Error('Expected argument of type api.PingReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_PingReply(buffer_arg) {
  return api_pb.PingReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_PingRequest(arg) {
  if (!(arg instanceof api_pb.PingRequest)) {
    throw new Error('Expected argument of type api.PingRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_PingRequest(buffer_arg) {
  return api_pb.PingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_SendTxReply(arg) {
  if (!(arg instanceof api_pb.SendTxReply)) {
    throw new Error('Expected argument of type api.SendTxReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_SendTxReply(buffer_arg) {
  return api_pb.SendTxReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_TxItem(arg) {
  if (!(arg instanceof api_pb.TxItem)) {
    throw new Error('Expected argument of type api.TxItem');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_TxItem(buffer_arg) {
  return api_pb.TxItem.deserializeBinary(new Uint8Array(buffer_arg));
}


// The api service
var ApiService = exports.ApiService = {
  // Get a balance of a user
  getBalance: {
    path: '/api.Api/GetBalance',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.BalanceRequest,
    responseType: api_pb.BalanceReply,
    requestSerialize: serialize_api_BalanceRequest,
    requestDeserialize: deserialize_api_BalanceRequest,
    responseSerialize: serialize_api_BalanceReply,
    responseDeserialize: deserialize_api_BalanceReply,
  },
  // Sends a ping
  sendPing: {
    path: '/api.Api/SendPing',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.PingRequest,
    responseType: api_pb.PingReply,
    requestSerialize: serialize_api_PingRequest,
    requestDeserialize: deserialize_api_PingRequest,
    responseSerialize: serialize_api_PingReply,
    responseDeserialize: deserialize_api_PingReply,
  },
  // Add a transaction to the pending transactions
  // Return pending transaction count
  sendTx: {
    path: '/api.Api/SendTx',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.TxItem,
    responseType: api_pb.SendTxReply,
    requestSerialize: serialize_api_TxItem,
    requestDeserialize: deserialize_api_TxItem,
    responseSerialize: serialize_api_SendTxReply,
    responseDeserialize: deserialize_api_SendTxReply,
  },
  // Return a list of pending transactions
  pendingTxs: {
    path: '/api.Api/PendingTxs',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Empty,
    responseType: api_pb.PendingTxsReply,
    requestSerialize: serialize_api_Empty,
    requestDeserialize: deserialize_api_Empty,
    responseSerialize: serialize_api_PendingTxsReply,
    responseDeserialize: deserialize_api_PendingTxsReply,
  },
  // Mine a block with transactions (may be empty)
  mine: {
    path: '/api.Api/Mine',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.MineRequest,
    responseType: api_pb.MineReply,
    requestSerialize: serialize_api_MineRequest,
    requestDeserialize: deserialize_api_MineRequest,
    responseSerialize: serialize_api_MineReply,
    responseDeserialize: deserialize_api_MineReply,
  },
};

exports.ApiClient = grpc.makeGenericClientConstructor(ApiService);
