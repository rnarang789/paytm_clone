import { Card } from "@repo/ui/card";

export default function ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) {
  return (
    <Card title={"Balance"}>
      <RowCard
        amount={amount}
        title={"Unlocked balance"}
        needTopPadding={false}
      />
      <RowCard amount={locked} title={"Total Locked Balance"} />
      <RowCard
        amount={amount + locked}
        title={"Total Balance"}
        showBottomDivider={false}
      />
    </Card>
  );
}

const RowCard = ({
  amount,
  title,
  showBottomDivider = true,
  needTopPadding = true,
}: {
  amount: number;
  title: string;
  showBottomDivider?: boolean;
  needTopPadding?: boolean;
}) => {
  return (
    <div
      className={` flex justify-between pb-2 ${needTopPadding ? "pt-2" : ""} ${showBottomDivider ? "border-b border-slate-300" : ""} `}
    >
      <div> {title}</div>
      <div> {amount / 100} INR</div>
    </div>
  );
};
