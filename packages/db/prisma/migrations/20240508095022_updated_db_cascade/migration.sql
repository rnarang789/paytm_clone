-- DropForeignKey
ALTER TABLE "Balances" DROP CONSTRAINT "Balances_userId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransactions" DROP CONSTRAINT "OnRampTransactions_userId_fkey";

-- AddForeignKey
ALTER TABLE "Balances" ADD CONSTRAINT "Balances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnRampTransactions" ADD CONSTRAINT "OnRampTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
