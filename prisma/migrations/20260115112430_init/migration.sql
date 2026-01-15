/*
  Warnings:

  - You are about to drop the `_BrandToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BrandToProduct" DROP CONSTRAINT "_BrandToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_BrandToProduct" DROP CONSTRAINT "_BrandToProduct_B_fkey";

-- AlterTable
ALTER TABLE "product_store" ADD COLUMN     "brandId" TEXT;

-- DropTable
DROP TABLE "_BrandToProduct";

-- AddForeignKey
ALTER TABLE "product_store" ADD CONSTRAINT "product_store_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
