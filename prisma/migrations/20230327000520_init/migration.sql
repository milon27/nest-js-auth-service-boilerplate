-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL DEFAULT 'other',
    `avatar` VARCHAR(191) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `roleSlug` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `slug` VARCHAR(50) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT 'Description about the role.',
    `canAccessCms` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `role_slug_key`(`slug`),
    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` VARCHAR(191) NOT NULL,
    `modelName` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT true,
    `create` BOOLEAN NOT NULL DEFAULT false,
    `update` BOOLEAN NOT NULL DEFAULT false,
    `delete` BOOLEAN NOT NULL DEFAULT false,
    `roleSlug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `permission_modelName_roleSlug_key`(`modelName`, `roleSlug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleSlug_fkey` FOREIGN KEY (`roleSlug`) REFERENCES `role`(`slug`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `permission_roleSlug_fkey` FOREIGN KEY (`roleSlug`) REFERENCES `role`(`slug`) ON DELETE CASCADE ON UPDATE CASCADE;
