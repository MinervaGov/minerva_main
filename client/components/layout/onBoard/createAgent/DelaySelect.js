import React from "react";
import { Select, SelectItem } from "@heroui/react";

const delayPeriodList = [
  {
    id: "43200000",
    name: "12 hours",
  },
  {
    id: "86400000",
    name: "1 days",
  },
];

const DelaySelect = ({ delayPeriod, setDelayPeriod }) => {
  return (
    <Select
      className=""
      label="Delay Period"
      placeholder="Delay before the agent can take action"
      selectedKeys={delayPeriod ? [delayPeriod] : []}
      onSelectionChange={(keys) => setDelayPeriod(Array.from(keys)[0])}
    >
      {delayPeriodList.map((delayPeriod) => (
        <SelectItem key={delayPeriod.id} value={delayPeriod.id}>
          {delayPeriod.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default DelaySelect;
