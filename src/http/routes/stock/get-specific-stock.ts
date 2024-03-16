import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function getSpecificStock(app: FastifyInstance) {
  app.get('/stock/:stockId', async (request, reply) => {
    const stockParams = z.object({
      stockId: z.string(),
    })

    const { stockId } = stockParams.parse(request.params)

    const stock = await prisma.estoque.findFirst({
      where: {
        id: Number(stockId),
      },
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

    if (!stock) {
      return reply.status(400).send({ message: 'ID dessa estoque não existe' })
    }

    return reply.status(200).send(stock)
  })
}
