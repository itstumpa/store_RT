/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `brands` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `brands` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "country" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_store" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_InventoryLogToProductVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InventoryLogToProductVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InventoryLogToProductVariant_B_index" ON "_InventoryLogToProductVariant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "brands_slug_key" ON "brands"("slug");

-- AddForeignKey
ALTER TABLE "_InventoryLogToProductVariant" ADD CONSTRAINT "_InventoryLogToProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "inventory_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryLogToProductVariant" ADD CONSTRAINT "_InventoryLogToProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
