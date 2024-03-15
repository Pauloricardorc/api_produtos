import fastify from 'fastify'
import { createProducts } from './http/routes/products/create-products'
import { getAllProducts } from './http/routes/products/get-all-products'
import { getSpecificProduct } from './http/routes/products/get-specific-product'

const app = fastify()

app.register(createProducts)

app.register(getAllProducts)
app.register(getSpecificProduct)

app.listen({ port: 3333 }).then(() => {
  console.log('🧑‍🚀 server is running')
})
