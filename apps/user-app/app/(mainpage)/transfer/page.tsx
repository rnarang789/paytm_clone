import { getServerSession } from "next-auth";
import AddMoney from "../../components/AddMoney";
import BalanceCard from "../../components/BalanceCard";
import OnRampTransactions from "../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

const getBalance = async () => {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balances.findFirst({
    where: { userId: session.user.id },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.lockedAmount || 0,
  };
};

const getOnRampTransactions = async () => {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.onRampTransactions.findMany({
    where: { userId: session.user.id },
  });
  return transactions.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
};

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-screen">
      <div className=" font-bold text-[#6a51a6] text-4xl py-8">Transfer</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className=" pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
