-- CreateTable
CREATE TABLE `Members` (
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Members_code_key`(`code`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Books` (
    `code` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,

    UNIQUE INDEX `Books_code_key`(`code`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Borrow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberCode` VARCHAR(191) NOT NULL,
    `bookCode` VARCHAR(191) NOT NULL,
    `borrowedAt` DATETIME(3) NOT NULL,
    `returnedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `Members`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `Books`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
