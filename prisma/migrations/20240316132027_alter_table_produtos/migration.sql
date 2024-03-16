/*
  Warnings:

  - You are about to drop the column `categoria` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `marca` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "categoria",
DROP COLUMN "marca";
