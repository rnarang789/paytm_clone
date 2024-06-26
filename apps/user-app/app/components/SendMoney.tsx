"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import sendMoney from "../lib/actions/p2pTransfer";

export default function () {
  const [number, setNumber] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  return (
    <Card title={"Send Money"}>
      <div className="">
        <TextInput
          placeholder={"Add Number"}
          label={"Number"}
          onChange={(value: string) => {
            setNumber(value);
          }}
        ></TextInput>
      </div>
      <div className=" py-4">
        <TextInput
          placeholder={"Add Number"}
          label={"Number"}
          onChange={(value: string) => {
            setAmount(Number(value));
          }}
        ></TextInput>
      </div>
      <Center>
        <Button
          onClick={async () => {
            const message = await sendMoney(amount * 100, number);
            alert(message.message);
          }}
        >
          Send Money
        </Button>
      </Center>
    </Card>
  );
}
