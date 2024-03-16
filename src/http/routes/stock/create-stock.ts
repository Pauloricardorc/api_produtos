import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function createStock(app: FastifyInstance) {
  app.post('/stock', async (request, reply) => {
    const createStockBody = z.object({
      quantidade: z.number(),
      idProduto: z.number(),
    })

    const { quantidade, idProduto } = await createStockBody.parse(request.body)

    const stockAreadyExist = await prisma.estoque.findFirst({
      where: {
        quantidade,
        produtosId: idProduto,
      },
    })

    if (stockAreadyExist) {
      throw new Error('Categoria já existente')
    }

    await prisma.estoque.create({
      data: {
        quantidade,
        produtosId: idProduto,
      },
    })

    return reply.status(201).send('Estoque cadastrada com sucesso')
  })
}
