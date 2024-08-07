"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState, useEffect } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
  {
    name: "IDFC Bank",
    redirectUrl: "https://www.idfcfirstbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[2]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[2]?.name || "");
  const [value, setValue] = useState("");

  useEffect(() => {
    const transactionStatus = localStorage.getItem("transactionStatus");
    if (transactionStatus === "success") {
      alert("Transaction was successful!");
      localStorage.removeItem("transactionStatus");
    }
  }, []);

  const handleAddMoneyClick = async () => {
    if (value === "0") {
      alert("Amount cannot be zero");
      return;
    }

    const transactionSuccess = await createOnRampTransaction(
      provider,
      Number(value)
    );
    if (transactionSuccess) {
      localStorage.setItem("transactionStatus", "success");
    }
    window.location.href = redirectUrl || "";
  };

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          value={value.toString()}
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setValue(val);
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          defaultValue={provider}
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button onClick={handleAddMoneyClick}>Add Money</Button>
        </div>
      </div>
    </Card>
  );
};
