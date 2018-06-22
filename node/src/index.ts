import 'tsconfig-paths/register';
import { App } from '@src/app';

const GRPC_HOST = process.env.GRPC_HOST || '0.0.0.0';
const GRPC_PORT = process.env.GRPC_PORT || '9092';

const app = new App();
const port = app.start(GRPC_HOST, +GRPC_PORT);

// tslint:disable-next-line
console.log(`Listening on ${GRPC_HOST}:${port}`);
