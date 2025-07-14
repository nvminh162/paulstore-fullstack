/*
  Warnings:

  - You are about to alter the column `accountType` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - A unique constraint covering the columns `[userId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverName` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverPhone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentRef` VARCHAR(191) NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `receiverAddress` VARCHAR(255) NOT NULL,
    ADD COLUMN `receiverName` VARCHAR(255) NOT NULL,
    ADD COLUMN `receiverPhone` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `sold` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` MODIFY `accountType` VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE `order_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `orders_userId_key` ON `orders`(`userId`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_detail` ADD CONSTRAINT `order_detail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_detail` ADD CONSTRAINT `order_detail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
