/*
  Warnings:

  - The primary key for the `Mastery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Mastery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mastery" DROP CONSTRAINT "Mastery_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Mastery_pkey" PRIMARY KEY ("puuid", "championId");
