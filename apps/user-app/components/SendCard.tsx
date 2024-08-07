"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    const amountValue = Number(amount);

    if (amountValue === 0) {
      alert("Amount cannot be zero");
      return;
    }

    try {
      const response = await p2pTransfer(number, amountValue * 100);
      alert(response.message);
      if (response.message === "Transaction successful") {
        setNumber("");
        setAmount("");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred during the transaction");
    }
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <div className="text-xl text-slate-500 font-semibold">
          Send money to your Peers with just one click!
          <Card title="Send">
            <div className="min-w-72 pt-2">
              <TextInput
                placeholder="Number"
                label="Number"
                value={number}
                onChange={(value) => setNumber(value)}
              />
              <TextInput
                placeholder="Amount"
                label="Amount"
                value={amount}
                onChange={(value) => setAmount(value)}
              />
              <div className="pt-4 flex justify-center">
                <Button onClick={handleTransfer}>Send</Button>
              </div>
            </div>
          </Card>
        </div>
      </Center>
    </div>
  );
}
