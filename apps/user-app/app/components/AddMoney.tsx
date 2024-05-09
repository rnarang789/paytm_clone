"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import createOnRampTransaction from "../lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export default function () {
  const [selectedBankDetails, setSelectedBankDetails] = useState<{
    name: string;
    redirectUrl: string;
  }>({
    name: SUPPORTED_BANKS[0]?.name ?? "",
    redirectUrl: SUPPORTED_BANKS[0]?.redirectUrl ?? "",
  });

  const [amount, setAmount] = useState<number>(0);
  return (
    <Card title={"Add Money"}>
      <div className="w-full">
        <TextInput
          placeholder={"Amount"}
          label={"Amount"}
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />
        <Select
          options={SUPPORTED_BANKS.map((bank) => ({
            key: bank.name,
            value: bank.name,
          }))}
          onSelect={(value) => {
            setSelectedBankDetails({
              name: SUPPORTED_BANKS.find((x) => x.name === value)?.name || "",
              redirectUrl:
                SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl ||
                "",
            });
          }}
          label={"Bank"}
        ></Select>
        <div className=" flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(selectedBankDetails.name, amount);
              window.location.href = selectedBankDetails.redirectUrl;
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
}
