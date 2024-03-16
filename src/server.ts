import fastify from 'fastify'
import { createProducts } from './http/routes/products/create-products'
import { getAllProducts } from './http/routes/products/get-all-products'
import { getSpecificProduct } from './http/routes/products/get-specific-product'
import { createCategory } from './http/routes/category/create-category'
import { getAllCategory } from './http/routes/category/get-all-category'
import { getSpecificCategory } from './http/routes/category/get-specific-category'
import { createBrand } from './http/routes/brand/create-brand'
import { getAllBrand } from './http/routes/brand/get-all-brand'
import { getSpecificBrand } from './http/routes/brand/get-specific-brand'
import { getAllStock } from './http/routes/stock/get-all-stock'
import { getSpecificStock } from './http/routes/stock/get-specific-stock'
import { createStock } from './http/routes/stock/create-stock'
import { getAllSale } from './http/routes/sale/get-all-sale'
import { getSpecificSale } from './http/routes/sale/get-specific-sale'
import { createSale } from './http/routes/sale/create-sale'

const app = fastify()

app.register(createProducts)
app.register(createCategory)
app.register(createBrand)
app.register(createStock)
app.register(createSale)

app.register(getAllProducts)
app.register(getSpecificProduct)

app.register(getAllCategory)
app.register(getSpecificCategory)

app.register(getAllBrand)
app.register(getSpecificBrand)

app.register(getAllStock)
app.register(getSpecificStock)

app.register(getAllSale)
app.register(getSpecificSale)

app.listen({ port: 3333 }).then(() => {
  console.log('🧑‍🚀 server is running')
})
