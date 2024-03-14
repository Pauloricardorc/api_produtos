import { FastifyInstance } from 'fastify'
import { registerProducts } from './controllers/registerProducts'

export async function appRoutes(app: FastifyInstance) {
  app.post('/product', registerProducts)
}
