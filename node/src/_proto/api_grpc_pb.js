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
};

exports.ApiClient = grpc.makeGenericClientConstructor(ApiService);
