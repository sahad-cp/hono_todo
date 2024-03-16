import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import apirooute from './routes/api.routes'

const app = new Hono()

const port = 3000
console.log(`Server is running on port ${port}`)
app.route('/api',apirooute)

serve({
  fetch: app.fetch,
  port:port
})
