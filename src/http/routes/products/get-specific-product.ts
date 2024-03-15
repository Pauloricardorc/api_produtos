import { prisma } from '@/lib/prisma'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getSpecificProduct(app: FastifyInstance) {
  app.get(
    '/product/:productId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const getIdParams = z.object({
        productId: z.string(),
      })
      const { productId } = getIdParams.parse(request.params)

      const product = await prisma.produtos.findFirst({
        where: {
          id: Number(productId),
        },
      })
      console.log(product)

      if (!productId) {
        return reply
          .status(400)
          .send({ message: 'ID desse produto não existe.' })
      }

      return reply.status(200).send(product)
    },
  )
}
