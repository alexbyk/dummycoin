var messages = require('./_proto/hello_pb');
var services = require('./_proto/hello_grpc_pb');

var grpc = require('grpc');

function main() {
  var client = new services.GreeterClient('localhost:9090',
                                          grpc.credentials.createInsecure());
  var request = new messages.HelloRequest();
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  request.setName(user);
  client.sayHello(request, function(err, response) {
    console.log('Greeting:', response.getMessage());
  });
}

main();
