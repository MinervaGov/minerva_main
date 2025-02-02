import React from "react";
import { Select, SelectItem } from "@heroui/react";

const DAOList = [
  {
    id: "lido",
    name: "Lido",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
  },
  {
    id: "aave",
    name: "Aave",
  },
];

const DAOSelect = ({ selectedDAO, setSelectedDAO }) => {
  return (
    <Select
      className=""
      label="DAO"
      placeholder="Select a DAO"
      selectedKeys={selectedDAO ? [selectedDAO] : []}
      onSelectionChange={(keys) => setSelectedDAO(Array.from(keys)[0])}
    >
      {DAOList.map((dao) => (
        <SelectItem key={dao.id} value={dao.id}>
          {dao.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default DAOSelect;
