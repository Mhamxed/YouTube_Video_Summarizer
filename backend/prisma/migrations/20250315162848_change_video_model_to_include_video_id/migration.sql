/*
  Warnings:

  - You are about to drop the column `url` on the `Video` table. All the data in the column will be lost.
  - Added the required column `VideoURL` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "url",
ADD COLUMN     "VideoURL" TEXT NOT NULL,
ADD COLUMN     "channelId" TEXT NOT NULL,
ADD COLUMN     "videoId" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
