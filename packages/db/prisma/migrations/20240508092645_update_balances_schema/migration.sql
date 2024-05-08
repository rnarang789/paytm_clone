/*
  Warnings:

  - Added the required column `lockedAmount` to the `Balances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balances" ADD COLUMN     "lockedAmount" INTEGER NOT NULL;
