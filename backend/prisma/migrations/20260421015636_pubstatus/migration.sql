/*
  Warnings:

  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('PUBLISHED', 'UNPUBLISHED');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
ADD COLUMN     "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'UNPUBLISHED';
