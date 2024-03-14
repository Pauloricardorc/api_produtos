/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductsRepository } from '@/repositories/prisma-repository'
import { ProductAlreadyExistsError } from './errors/products-already-exists-error'

interface productsUseCaseRequest {
  nome: string
  descricao: string
  desconto: number
  avaliacao: number
  preco: number
  estoque: number
  marca: string
  categoria: string
  preview: string
  images: string[]
}

export class ProductsUseCase {
  constructor(private productRepository: ProductsRepository) {}

  async execute({
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
  }: productsUseCaseRequest) {
    const productAlreadyExists = await this.productRepository.findByNome(nome)

    if (productAlreadyExists) {
      throw new ProductAlreadyExistsError()
    }

    await this.productRepository.create({
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
  }
}
