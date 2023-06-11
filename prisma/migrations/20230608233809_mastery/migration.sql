-- CreateTable
CREATE TABLE "Mastery" (
    "puuid" TEXT NOT NULL,
    "championId" INTEGER NOT NULL,
    "championLevel" INTEGER NOT NULL,
    "championPoints" INTEGER NOT NULL,
    "lastPlayTime" INTEGER NOT NULL,
    "championPointsSinceLastLevel" INTEGER NOT NULL,
    "championPointsUntilNextLevel" INTEGER NOT NULL,
    "chestGranted" BOOLEAN NOT NULL,
    "tokensEarned" INTEGER NOT NULL,
    "summonerId" TEXT NOT NULL,

    CONSTRAINT "Mastery_pkey" PRIMARY KEY ("puuid")
);
