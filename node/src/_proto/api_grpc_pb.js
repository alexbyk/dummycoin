// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api_pb = require('./api_pb.js');

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


// The ping service definition.
var PingerService = exports.PingerService = {
  // Sends a ping
  sendPing: {
    path: '/api.Pinger/SendPing',
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

exports.PingerClient = grpc.makeGenericClientConstructor(PingerService);
