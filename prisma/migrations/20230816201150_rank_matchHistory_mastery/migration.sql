/*
  Warnings:

  - The primary key for the `MatchHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `participants` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `miniSerieslosses` on the `Rank` table. All the data in the column will be lost.
  - You are about to drop the column `miniSeriesprogress` on the `Rank` table. All the data in the column will be lost.
  - You are about to drop the column `miniSeriestarget` on the `Rank` table. All the data in the column will be lost.
  - You are about to drop the column `miniSerieswins` on the `Rank` table. All the data in the column will be lost.
  - Added the required column `puuid` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchHistory" DROP CONSTRAINT "MatchHistory_pkey",
DROP COLUMN "id",
DROP COLUMN "participants",
ADD COLUMN     "matches" TEXT[],
ADD COLUMN     "puuid" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("puuid");

-- AlterTable
ALTER TABLE "Rank" DROP COLUMN "miniSerieslosses",
DROP COLUMN "miniSeriesprogress",
DROP COLUMN "miniSeriestarget",
DROP COLUMN "miniSerieswins";

-- CreateTable
CREATE TABLE "Mastery" (
    "puuid" TEXT NOT NULL,
    "championId" INTEGER NOT NULL,
    "championLevel" INTEGER NOT NULL,
    "championPoints" INTEGER NOT NULL,
    "lastPlayTime" BIGINT NOT NULL,
    "championPointsSinceLastLevel" INTEGER NOT NULL,
    "championPointsUntilNextLevel" INTEGER NOT NULL,
    "chestGranted" BOOLEAN NOT NULL,
    "tokensEarned" INTEGER NOT NULL,
    "summonerId" TEXT NOT NULL,

    CONSTRAINT "Mastery_pkey" PRIMARY KEY ("puuid","championId")
);
