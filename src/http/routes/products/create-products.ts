import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function createProducts(app: FastifyInstance) {
  app.post('/product', async (request, reply) => {
    const createProductsBody = z.object({
      nome: z.string(),
      descricao: z.string(),
      desconto: z.number(),
      avaliacao: z.number(),
      preco: z.number(),
      estoque: z.number(),
      marca: z.string(),
      categoria: z.string(),
      preview: z.string(),
      images: z.array(z.string()),
    })

    const {
      nome,
      descricao,
      desconto,
      avaliacao,
      preco,
      estoque,
      marca,
      categoria,
      preview,
      images,
    } = await createProductsBody.parse(request.body)

    const productAreadyExist = await prisma.produtos.findUnique({
      where: {
        nome,
      },
    })

    if (productAreadyExist) {
      throw new Error('Produto com nome já existente')
    }

    const product = await prisma.produtos.create({
      data: {
        nome,
        descricao,
        desconto,
        avaliacao,
        preco,
        estoque,
        marca,
        categoria,
        preview,
        images,
      },
    })

    return reply
      .status(201)
      .send({ id_produto: product.id, nome: product.nome })
  })
}
