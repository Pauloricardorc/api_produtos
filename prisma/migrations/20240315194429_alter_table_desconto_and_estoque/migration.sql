/*
  Warnings:

  - You are about to drop the column `estoque` on the `estoque` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "estoque" DROP COLUMN "estoque";

-- AlterTable
ALTER TABLE "preco_desconto" ALTER COLUMN "desconto" DROP NOT NULL;
