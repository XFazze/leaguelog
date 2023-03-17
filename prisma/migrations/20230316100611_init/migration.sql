-- CreateTable
CREATE TABLE "User" (
    "accountId" TEXT NOT NULL PRIMARY KEY,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "summonerLevel" INTEGER NOT NULL
);
