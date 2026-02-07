import { serve, type ServerType } from '@hono/node-server'
import ENV from 'dotenv/config';
import app from './app.ts';
import type { AddressInfo } from 'net';

const PORT = process.env.PORT || 3000;

const server: ServerType = serve({
  fetch: app.fetch,
  port: Number(PORT),
});

const severAddress = server.address() as AddressInfo;

console.log(`Server running on ${severAddress.address}:${severAddress.port}`);