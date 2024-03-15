import { prisma } from '@/lib/prisma'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function getAllProducts(app: FastifyInstance) {
  app.get('/products', async (request: FastifyRequest, reply: FastifyReply) => {
    const products = await prisma.produtos.findMany()

    return reply.status(200).send(products)
  })
}
