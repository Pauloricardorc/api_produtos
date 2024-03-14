import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { ProductsRepository } from '../prisma-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async findByNome(nome: string) {
    const produto = await prisma.produtos.findUnique({
      where: {
        nome,
      },
    })

    return produto
  }

  async create(data: Prisma.ProdutosCreateInput) {
    const products = await prisma.produtos.create({
      data,
    })

    return products
  }
}
