import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function getSpecificBrand(app: FastifyInstance) {
  app.get('/brand/:brandId', async (request, reply) => {
    const brandParams = z.object({
      brandId: z.string(),
    })

    const { brandId } = brandParams.parse(request.params)

    const brand = await prisma.marcas.findFirst({
      where: {
        id: Number(brandId),
      },
    })

    if (!brand) {
      return reply.status(400).send({ message: 'ID dessa marca não existe' })
    }

    return reply.status(200).send(brand)
  })
}
