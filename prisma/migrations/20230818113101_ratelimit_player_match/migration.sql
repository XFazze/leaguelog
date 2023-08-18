/*
  Warnings:

  - You are about to drop the `Ratelimit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gameDuration` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queueId` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchPlayer" ADD COLUMN     "gameDuration" INTEGER NOT NULL,
ADD COLUMN     "queueId" INTEGER NOT NULL,
ALTER COLUMN "placement" DROP NOT NULL,
ALTER COLUMN "playerAugment1" DROP NOT NULL,
ALTER COLUMN "playerAugment2" DROP NOT NULL,
ALTER COLUMN "playerAugment3" DROP NOT NULL,
ALTER COLUMN "playerAugment4" DROP NOT NULL,
ALTER COLUMN "playerSubteamId" DROP NOT NULL,
ALTER COLUMN "subteamPlacement" DROP NOT NULL;

-- DropTable
DROP TABLE "Ratelimit";
