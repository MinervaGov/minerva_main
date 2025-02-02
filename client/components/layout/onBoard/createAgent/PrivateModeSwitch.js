import React from "react";
import { Switch, cn } from "@heroui/react";
import { LockIcon, UnlockIcon } from "lucide-react";

const PrivateModeSwitch = ({ isSelected, setIsSelected }) => {
  return (
    <Switch
      isSelected={isSelected}
      onValueChange={setIsSelected}
      color="secondary"
      size="lg"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <LockIcon size={14} className={className} />
        ) : (
          <UnlockIcon size={14} className={className} />
        )
      }
      classNames={{
        base: cn(
          "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-purple-500/50"
        ),
        thumb: cn(
          "w-6 h-6 border-2 shadow-lg",
          "group-data-[selected=true]:ms-6",
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ms-4"
        ),
      }}
    >
      <div className="flex flex-col gap-1 text-left">
        <p className="text-medium">Private Mode</p>
        <p className="text-tiny text-default-400">
          This will make your agent private and only accessible by you.
        </p>
      </div>
    </Switch>
  );
};

export default PrivateModeSwitch;
