import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function createCategory(app: FastifyInstance) {
  app.post('/category', async (request, reply) => {
    const createCategoryBody = z.object({
      nomeCategoria: z.string(),
    })

    const { nomeCategoria } = await createCategoryBody.parse(request.body)

    const categoryAreadyExist = await prisma.categorias.findFirst({
      where: {
        categoria: nomeCategoria,
      },
    })

    if (categoryAreadyExist) {
      throw new Error('Categoria já existente')
    }

    await prisma.categorias.create({
      data: {
        categoria: nomeCategoria,
      },
    })

    return reply.status(201).send('Categoria cadastrada com sucesso')
  })
}
