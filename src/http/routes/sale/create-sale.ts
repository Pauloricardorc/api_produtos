import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function createSale(app: FastifyInstance) {
  app.post('/sale', async (request, reply) => {
    const createSaleBody = z.object({
      desconto: z.number(),
      preco: z.number(),
      idProduto: z.number(),
    })

    const { desconto, preco, idProduto } = await createSaleBody.parse(
      request.body,
    )

    const saleAreadyExist = await prisma.preco_Desconto.findFirst({
      where: {
        desconto,
        preco,
        produtosId: idProduto,
      },
    })

    if (saleAreadyExist) {
      throw new Error('Preço desse produto já existente')
    }

    await prisma.preco_Desconto.create({
      data: {
        desconto,
        preco,
        produtosId: idProduto,
      },
    })

    return reply.status(201).send('Preço do produto cadastrado com sucesso')
  })
}
