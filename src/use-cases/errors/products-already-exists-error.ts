export class ProductAlreadyExistsError extends Error {
  constructor() {
    super('Produto já existente')
  }
}
