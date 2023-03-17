/*
  Warnings:

  - You are about to drop the column `summonerId` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `revisionDate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "updatedAt" DATETIME NOT NULL,
    "accountId" TEXT NOT NULL PRIMARY KEY,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "summonerLevel" INTEGER NOT NULL
);
INSERT INTO "new_User" ("accountId", "name", "profileIconId", "puuid", "revisionDate", "summonerLevel") SELECT "accountId", "name", "profileIconId", "puuid", "revisionDate", "summonerLevel" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
