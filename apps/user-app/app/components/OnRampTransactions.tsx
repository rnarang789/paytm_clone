import { Card } from "@repo/ui/card";

export default function ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO::: Maybe can convert status type to enum
    status: string;
    provider: string;
    id: string;
  }[];
}) {
  if (!transactions.length) {
    return (
      <Card title={"Recent Transactions"}>
        <div className="text-center py-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title={"Recent Transactions"}>
      <div>
        {transactions.map((x) => (
          <TransactionUi
            key={x.id}
            time={x.time}
            status={x.status}
            amount={x.amount}
          />
        ))}
      </div>
    </Card>
  );
}

const TransactionUi = ({
  time,
  status,
  amount,
}: {
  time: Date;
  status: string;
  amount: number;
}) => {
  return (
    <div className="flex justify-between pt-2">
      <div>
        <div className="text-sm">{status}</div>
        <div className="text-slate-600 text-xs">{time.toDateString()}</div>
      </div>
      <div className="flex flex-col justify-center">+ Rs {amount / 100}</div>
    </div>
  );
};
