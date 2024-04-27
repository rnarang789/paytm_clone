"use client";
import { updateBalance, useBalance } from "@repo/store/useBalance";

export default function Page(): JSX.Element {
  updateBalance(3);
  const balance = useBalance();
  return <div>HI THERE {balance}</div>;
}
