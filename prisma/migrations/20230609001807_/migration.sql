/*
  Warnings:

  - The primary key for the `Mastery` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Mastery" DROP CONSTRAINT "Mastery_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Mastery_pkey" PRIMARY KEY ("id");
