import { Prisma, Produtos } from '@prisma/client'

export interface ProductsRepository {
  findByNome(nome: string): Promise<Produtos | null>
  create(data: Prisma.ProdutosCreateInput): Promise<Produtos>
}
