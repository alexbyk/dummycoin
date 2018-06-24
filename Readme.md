# About DummyCoin

DummyCoin is my test task for the job interview. I made some changes to the original task.
Because cutting-edge technologies require cutting-edge technologies :smiley:

:punch: Api is based on GRPC protocol. Because it's way better than json and written once is ready for any language.

:heart_eyes: Typescript instead of Javascript. Because it’s superior.

:ok_hand: RxJS for simple and convenient state management and as a communication layer of abstraction between
frontend and grpc api

:boom: Proof-of-work improved. User should calculate a nounce that will lead to hash containing `0` in the beginning (constant complexity)

:sunglasses: Blockchain itself is implemented as a separate library

:eyes: Blockhain can use any db/file/memory storage that satisfies `IStore` interface. Simple InMemory storage ships with this package

:muscle:  This application also is a simple but awesome GRPC microframework. Writing new methods is a pleasure

:grinning: The blockchain `libdummy` librarry does support consensus (pick the longest valid chain), but for demonstration purposes nodejs methods are missing

:fire: Awesome `Angular 6` as a frontend framework and awesome `micro` as nodejs microframework

# Demo

http://dummycoin.alexbyk.com

# Running on the local machine

Install docker and docker-compose. Download docker-compose file and run it
```
wget -O docker-compose.yml https://raw.githubusercontent.com/alexbyk/dummycoin/master/docker-compose.yml
docker-compose down && docker-compose pull  && docker-compose up -d
```

See the content of the `docker-compose.yml` to find docker-hub images

## Development
* `./run` - build all neccessary files and protos and run development servers on `http://localhost:4200`
* `./run test` - just run development server without rebuilding `api`
* `./run test` - test all
* `./run --help` - see other commands, (docker, docs generation...)

# Structure

- Each subproject contains `Dockerfile`s to build an image using `./run build-docker`
- Each subproject contains unit and functional tests. Run `npm run test:watch` for test-driven development

## Nodejs
- `libdummy` - blockchain reuseble library
- `micro` - awesome grpc microframework + grpc tester, written for this app
- `_proto` - autogenerated api files

[Autogenerated NodeJs docs](http://dummycoin.alexbyk.com/docs/front/index.html)

## Frontend (angular)
- `api-grpc` - grpc based api client, written for this app, that translates `grpc` calls into `RxJs`.
- `state` - easy `ready/error/data` states with `RxJs`.

[Autogenerated Front docs](http://dummycoin.alexbyk.com/docs/front/index.html)

## GRPC(Protobuf 3) api

We provide support for browsers using `grpcwebproxy` proxy server

[Autogenerated API docs](http://dummycoin.alexbyk.com/docs/node/index.html)

## Docker
By default, docker images use these ports

- 9090 - angular frontend
- 9091 - grpcwebproxy
- 9092 - node grpc server
- 9093 - documentation server

## Author
https://alexbyk.com
