import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function getSpecificCategory(app: FastifyInstance) {
  app.get('/category/:categoryId', async (request, reply) => {
    const categoryParams = z.object({
      categoryId: z.string(),
    })

    const { categoryId } = categoryParams.parse(request.params)

    const category = await prisma.categorias.findFirst({
      where: {
        id: Number(categoryId),
      },
    })

    if (!category) {
      return reply
        .status(400)
        .send({ message: 'ID dessa categoria não existe' })
    }

    return reply.status(200).send(category)
  })
}
