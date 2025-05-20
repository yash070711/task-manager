"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ControlledSelect({
  value,
  setValue,
  placeholder,
  options,
  matchField = "value",
  renderField = "label",
}) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-full dark:bg-neutral-900 dark:border-neutral-700 bg-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Array.isArray(options) &&
          options.map((option) => (
            <SelectItem key={option?.[matchField]} value={option?.[matchField]}>
              {option?.[renderField]}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
