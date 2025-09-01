"use client";

import React, { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

const statuses = [
  { id: 1, name: "Backlog", icon: "loading" },
  { id: 2, name: "Todo", icon: "circle" },
  { id: 3, name: "In Progress", icon: "dot-yellow" },
  { id: 4, name: "Done", icon: "check" },
  { id: 5, name: "Canceled", icon: "x" },
  { id: 6, name: "Duplicate", icon: "x" },
];

interface Status {
  id: number;
  name: string;
  icon: string;
}

interface AllDropdownProps {
  isOpen: boolean;
}

const AllDropdown: React.FC<AllDropdownProps> = ({ isOpen }) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const [selectedStatus, setSelectedStatus] = useState<number>(1); // Default Backlog

  const getIcon = (status: Status): React.ReactNode => {
    switch (status.icon) {
      case "loading":
        return (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></span>
        );
      case "circle":
        return <span className="h-3 w-3 rounded-full border-2 border-gray-500"></span>;
      case "dot-yellow":
        return <span className="text-yellow-500 text-lg">●</span>;
      case "check":
        return <span className="text-blue-600">✔</span>;
      case "x":
        return <span className="text-gray-400 text-lg">✕</span>;
      default:
        return null;
    }
  };

  return (
    <div className="relative inline-block text-left w-56">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm bg-white hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          {getIcon(statuses.find((s) => s.id === selectedStatus)!)}
          {statuses.find((s) => s.id === selectedStatus)?.name}
        </span>
        <span className="text-gray-400 text-xs">⌘K</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-white shadow-md">
          <Command>
            <CommandInput placeholder="Set status to..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status: Status) => (
                  <CommandItem
                    key={status.id}
                    value={status.name}
                    onSelect={() => {
                      setSelectedStatus(status.id);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {getIcon(status)}
                      <span>{status.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {selectedStatus === status.id && (
                        <span className="text-gray-500">✔</span>
                      )}
                      <span className="text-xs text-gray-400">{status.id}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default AllDropdown;
