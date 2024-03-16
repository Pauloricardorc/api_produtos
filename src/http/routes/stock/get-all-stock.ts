import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function getAllStock(app: FastifyInstance) {
  app.get('/stock', async (request, reply) => {
    const stock = await prisma.estoque.findMany({
      include: {
        produtos: {
          select: {
            nome: true,
            descricao: true,
            images: true,
            marcasId: true,
            categoriasId: true,
          },
        },
      },
    })

    return reply.status(200).send(stock)
  })
}
