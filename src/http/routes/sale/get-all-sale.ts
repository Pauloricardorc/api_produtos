import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function getAllSale(app: FastifyInstance) {
  app.get('/sale', async (request, reply) => {
    const sale = await prisma.preco_Desconto.findMany({
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

    return reply.status(200).send(sale)
  })
}
