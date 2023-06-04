/*
  Warnings:

  - The primary key for the `MatchHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MatchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `participants` on the `MatchHistory` table. All the data in the column will be lost.
  - Added the required column `puuid` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchHistory" DROP CONSTRAINT "MatchHistory_pkey",
DROP COLUMN "id",
DROP COLUMN "participants",
ADD COLUMN     "matches" TEXT[],
ADD COLUMN     "puuid" TEXT NOT NULL,
ADD CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("puuid");
