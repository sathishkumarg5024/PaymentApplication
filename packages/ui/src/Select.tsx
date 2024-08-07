"use client";
import { useState, useEffect } from "react";

export const Select = ({
  options,
  onSelect,
  defaultValue,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
  defaultValue?: string;
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
      onSelect(defaultValue);
    }
  }, [defaultValue, onSelect]);

  return (
    <select
      value={selectedValue}
      onChange={(e) => {
        setSelectedValue(e.target.value);
        onSelect(e.target.value);
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
