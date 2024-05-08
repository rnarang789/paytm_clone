"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";

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
  const [redirectUrl, setRedirectUrl] = useState<string>(
    SUPPORTED_BANKS[0]?.redirectUrl ?? ""
  );
  return (
    <Card title={"Add Money"}>
      <div className="w-full">
        <TextInput
          placeholder={"Amount"}
          label={"Amount"}
          onChange={(value) => {
            //TODO::: LOGIC TO BE ADDED
          }}
        />
        <Select
          options={SUPPORTED_BANKS.map((bank) => ({
            key: bank.name,
            value: bank.name,
          }))}
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          label={"Bank"}
        ></Select>
        <div className=" flex justify-center pt-4">
          <Button
            onClick={() => {
              window.location.href = redirectUrl;
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
}
