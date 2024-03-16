import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function getAllBrand(app: FastifyInstance) {
  app.get('/brand', async (request, reply) => {
    const brand = await prisma.marcas.findMany()

    return reply.status(200).send(brand)
  })
}
