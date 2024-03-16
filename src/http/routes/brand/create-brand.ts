import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function createBrand(app: FastifyInstance) {
  app.post('/brand', async (request, reply) => {
    const createBrandBody = z.object({
      marca: z.string(),
    })

    const { marca } = await createBrandBody.parse(request.body)

    const brandAreadyExist = await prisma.marcas.findFirst({
      where: {
        marca,
      },
    })

    if (brandAreadyExist) {
      throw new Error('Marca já existente')
    }

    await prisma.marcas.create({
      data: {
        marca,
      },
    })

    return reply.status(201).send('Marca cadastrada com sucesso')
  })
}
