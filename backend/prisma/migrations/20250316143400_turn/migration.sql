/*
  Warnings:

  - The `summary` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `keyInsights` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "summary",
ADD COLUMN     "summary" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "keyInsights",
ADD COLUMN     "keyInsights" TEXT[] DEFAULT ARRAY[]::TEXT[];
