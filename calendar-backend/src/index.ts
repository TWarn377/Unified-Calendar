import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config';
import { db } from './infrastructure/internal-database/db.ts';

const app = new Hono()
const dbt = db;

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
