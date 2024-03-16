-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `Todos_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Todos` ADD CONSTRAINT `Todos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
