/*
  Warnings:

  - You are about to drop the column `team0Ban0ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team0Ban1ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team0Ban2ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team0Ban3ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team0Ban4ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team1Ban0ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team2Ban1ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team3Ban2ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team4Ban3ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team5Ban4ChampionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `perks` on the `MatchPlayer` table. All the data in the column will be lost.
  - Added the required column `runePrimary1` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runePrimary2` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runePrimary3` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runePrimary4` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runeSecondary1` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runeSecondary2` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runeStatFlex` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runeStatOffenes` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runeStatdefense` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `win` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `eligibleForProgression` on the `MatchPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `firstBloodAssist` on the `MatchPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `firstBloodKill` on the `MatchPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `firstTowerAssist` on the `MatchPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `firstTowerKill` on the `MatchPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gameEndedInEarlySurrender` on the `MatchPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gameEndedInSurrender` on the `MatchPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `teamEarlySurrendered` on the `MatchPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "team0Ban0ChampionId",
DROP COLUMN "team0Ban1ChampionId",
DROP COLUMN "team0Ban2ChampionId",
DROP COLUMN "team0Ban3ChampionId",
DROP COLUMN "team0Ban4ChampionId",
DROP COLUMN "team1Ban0ChampionId",
DROP COLUMN "team2Ban1ChampionId",
DROP COLUMN "team3Ban2ChampionId",
DROP COLUMN "team4Ban3ChampionId",
DROP COLUMN "team5Ban4ChampionId",
ADD COLUMN     "team0BanChampionId" INTEGER[],
ADD COLUMN     "team1BanChampionId" INTEGER[],
ALTER COLUMN "gameCreation" SET DATA TYPE BIGINT,
ALTER COLUMN "gameEndTimestamp" SET DATA TYPE BIGINT,
ALTER COLUMN "gameId" SET DATA TYPE BIGINT,
ALTER COLUMN "gameStartTimestamp" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "MatchPlayer" DROP COLUMN "perks",
ADD COLUMN     "runePrimary1" INTEGER NOT NULL,
ADD COLUMN     "runePrimary2" INTEGER NOT NULL,
ADD COLUMN     "runePrimary3" INTEGER NOT NULL,
ADD COLUMN     "runePrimary4" INTEGER NOT NULL,
ADD COLUMN     "runeSecondary1" INTEGER NOT NULL,
ADD COLUMN     "runeSecondary2" INTEGER NOT NULL,
ADD COLUMN     "runeStatFlex" INTEGER NOT NULL,
ADD COLUMN     "runeStatOffenes" INTEGER NOT NULL,
ADD COLUMN     "runeStatdefense" INTEGER NOT NULL,
ADD COLUMN     "win" BOOLEAN NOT NULL,
ALTER COLUMN "challenges" DROP NOT NULL,
DROP COLUMN "eligibleForProgression",
ADD COLUMN     "eligibleForProgression" BOOLEAN NOT NULL,
DROP COLUMN "firstBloodAssist",
ADD COLUMN     "firstBloodAssist" BOOLEAN NOT NULL,
DROP COLUMN "firstBloodKill",
ADD COLUMN     "firstBloodKill" BOOLEAN NOT NULL,
DROP COLUMN "firstTowerAssist",
ADD COLUMN     "firstTowerAssist" BOOLEAN NOT NULL,
DROP COLUMN "firstTowerKill",
ADD COLUMN     "firstTowerKill" BOOLEAN NOT NULL,
DROP COLUMN "gameEndedInEarlySurrender",
ADD COLUMN     "gameEndedInEarlySurrender" BOOLEAN NOT NULL,
DROP COLUMN "gameEndedInSurrender",
ADD COLUMN     "gameEndedInSurrender" BOOLEAN NOT NULL,
DROP COLUMN "teamEarlySurrendered",
ADD COLUMN     "teamEarlySurrendered" BOOLEAN NOT NULL;
