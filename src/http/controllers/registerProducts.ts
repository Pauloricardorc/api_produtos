import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ProductsUseCase } from '@/use-cases/registerProduct'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repositories'
import { ProductAlreadyExistsError } from '@/use-cases/errors/products-already-exists-error'

export async function registerProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
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
  } = registerBodySchema.parse(request.body)

  try {
    const productRepository = new PrismaProductsRepository()
    const productsUseCase = new ProductsUseCase(productRepository)

    await productsUseCase.execute({
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
    })
  } catch (error) {
    if (error instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
