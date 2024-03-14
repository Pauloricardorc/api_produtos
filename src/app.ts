import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/products', async (request, reply) => {
  const registerBodySchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    preco: z.number(),
  })

  const { nome, descricao, preco } = registerBodySchema.parse(request.body)

  await prisma.produtos.create({
    data: {
      nome,
      descricao,
      preco,
    },
  })

  return reply.status(201).send()
})
