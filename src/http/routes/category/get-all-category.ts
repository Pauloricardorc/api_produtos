import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function getAllCategory(app: FastifyInstance) {
  app.get('/category', async (request, reply) => {
    const category = await prisma.categorias.findMany()

    return reply.status(200).send(category)
  })
}
