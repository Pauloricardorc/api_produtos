import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function getSpecificSale(app: FastifyInstance) {
  app.get('/sale/:saleId', async (request, reply) => {
    const saleParams = z.object({
      saleId: z.string(),
    })

    const { saleId } = saleParams.parse(request.params)

    const sale = await prisma.preco_Desconto.findFirst({
      where: {
        id: Number(saleId),
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

    if (!sale) {
      return reply.status(400).send({ message: 'ID desse preço não existe' })
    }

    return reply.status(200).send(sale)
  })
}
