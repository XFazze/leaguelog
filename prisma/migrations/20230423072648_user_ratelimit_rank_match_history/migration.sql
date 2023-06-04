-- CreateTable
CREATE TABLE "User" (
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "summonerLevel" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "Ratelimit" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ratelimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rank" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leagueId" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "summonerName" TEXT NOT NULL,
    "queueType" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "hotStreak" BOOLEAN NOT NULL,
    "veteran" BOOLEAN NOT NULL,
    "freshBlood" BOOLEAN NOT NULL,
    "inactive" BOOLEAN NOT NULL,
    "miniSerieswins" INTEGER,
    "miniSerieslosses" INTEGER,
    "miniSeriesprogress" TEXT,
    "miniSeriestarget" INTEGER,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchHistory" (
    "id" INTEGER NOT NULL,
    "participants" INTEGER[],

    CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("id")
);
