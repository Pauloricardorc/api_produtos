/*
  Warnings:

  - You are about to drop the column `avaliacao` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `desconto` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `estoque` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `preco` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `categoriasId` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marcasId` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "avaliacao",
DROP COLUMN "desconto",
DROP COLUMN "estoque",
DROP COLUMN "preco",
ADD COLUMN     "categoriasId" INTEGER NOT NULL,
ADD COLUMN     "marcasId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marcas" (
    "id" SERIAL NOT NULL,
    "marca" TEXT NOT NULL,

    CONSTRAINT "marcas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "id" SERIAL NOT NULL,
    "estoque" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "produtosId" INTEGER NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preco_desconto" (
    "id" SERIAL NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "produtosId" INTEGER NOT NULL,

    CONSTRAINT "preco_desconto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" SERIAL NOT NULL,
    "venda" INTEGER NOT NULL,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_marcasId_fkey" FOREIGN KEY ("marcasId") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriasId_fkey" FOREIGN KEY ("categoriasId") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preco_desconto" ADD CONSTRAINT "preco_desconto_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
