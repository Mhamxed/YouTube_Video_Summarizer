-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "viewcount" TEXT NOT NULL DEFAULT '0',
ALTER COLUMN "duration" SET DATA TYPE TEXT;
